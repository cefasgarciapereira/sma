import { Grid } from '@material-ui/core';

import { Wordcloud as WordcloudComponent } from 'components'

export default function Wordcloud() {
    return (
        <Grid container fullWidth>
            <Grid item xs={12} style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                <WordcloudComponent />
            </Grid>
        </Grid>
    )
}