import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { mockDocuments } from 'utils/documents';

export default function Wordcloud() {
    const [wordcloud, setWordcloud] = useState()

    useEffect(() => {
        Object.defineProperties(Array.prototype, {
            count: {
                value: function (value) {
                    return this.filter(x => x == value).length;
                }
            }
        });

        var all = ''
        let newWordcloud = []

        mockDocuments.map(doc => all = all + doc)
        let tokens = [...new Set(all.split(' '))];
        tokens.forEach(token => {
            console.log(token)
            newWordcloud.push({
                text: token,
                value: all.split(' ').count(token)
            })
        })
        setWordcloud(newWordcloud)
    }, [])


    if(!wordcloud) return <Typography>Generating wordcloud...</Typography>

    return (<ReactWordcloud words={wordcloud} />)
}