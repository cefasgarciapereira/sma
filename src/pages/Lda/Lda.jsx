import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography
} from '@material-ui/core';
import Sentiment from 'sentiment';

var lda = require('@stdlib/nlp-lda');
var model;
var sentiment;

export default function Lda() {
    const [documents] = useState(initialDocuments)
    const [kTopics] = useState(3)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        model = lda(documents, kTopics);
        model.fit(1000, 100, 10);
        sentiment = new Sentiment()
        setReady(true);
        // eslint-disable-next-line
    }, [])

    const renderTopics = (n) => {
        var topics = []
        var topicsSentiments = []

        for (let i = 0; i < kTopics; i++) {
            topics.push(model.getTerms(i, n))
        }

        topics.forEach(topic => {
            var topicSentiment = 0;
            topic.forEach(t => {
                documents.forEach(document => {
                    if (document.includes(t.word)) {
                        topicSentiment = topicSentiment + sentiment.analyze(document).score
                    }
                })
            })
            topicsSentiments.push(topicSentiment)
        })

        topicsSentiments = topicsSentiments.map(normalize(0, 10))
        topicsSentiments.forEach((sent, index) => topics[index].sentiment = sent)

        return topics
    }

    const normalize = (min, max) => {
        const delta = max - min;
        return val => ((val < min ? min : (val > max ? max : val)) - min) / delta;
    }


    return (
        <Grid container fullWidth p={4}>
            <Grid item xs={12}>
                <Typography variant="h4">Topic Modelling</Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
                <Grid container fullWidth>
                    {
                        ready &&
                        renderTopics(10).map((topic, index) => (
                            <Grid item xs={4} key={index}>
                                <h4>Topic {index}</h4>
                                <h4>Sentiment {topic.sentiment}</h4>
                                {topic.map(({ word, prob }) =>
                                    <div key={word}>
                                        <p>{word}: {parseFloat(prob).toFixed(2)}</p>
                                    </div>
                                )}
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

const initialDocuments = [
    'I loved you first',
    'For one is both and both are one in love',
    'You never see my pain',
    'My love is such that rivers cannot quench',
    'See a lot of pain, a lot of tears'
];