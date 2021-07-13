import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography
} from '@material-ui/core';

var lda = require('@stdlib/nlp-lda');
var model;
var speeches;

export default function Home() {
    const [documents, setDocuments] = useState(initialDocuments)
    const [kTopics, setKTopics] = useState(3)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        model = lda(documents, kTopics);
        model.fit(1000, 100, 10);
        setReady(true);
    }, [])

    const renderTopics = (n) => {
        var topics = []
        for (let i = 0; i < kTopics; i++) {
            topics.push(model.getTerms(i, n))
        }
        console.log(topics)
        return topics
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
                        renderTopics(5).map((topic, index) => (
                            <Grid item xs={4}>
                                <h4>Topic {index}</h4>
                                {topic.map(({ word, prob }) => <p>{word}: {prob}</p>)}
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