import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.css';
import { makeStyles } from '@material-ui/core/styles';

export const useStylesLoader = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

export default function Loader(props) {
    const classes = useStylesLoader();
    const { message } = props;

	return (
		<div className={classes.root}>
			<CircularProgress size={0.8 * 100} color="primary" className="waiting-center-container" />
            <div>
                <p className="message-center">{ message }</p>
            </div>
		</div>
	);
}
