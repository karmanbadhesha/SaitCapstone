import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { BrowserRouter as Router, Link, withRouter, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import validateInput from "../Validation/ForgotValidate";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: false,
			errors: {},
			sent: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
			this.error = true;
		}

		return isValid;
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			axios.post("http://localhost:3000/login/forgot", {
				email: this.state.email,
			})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log("login error!");
					console.log(error);
				});
		}
	}

	render() {
		const { errors, email } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div>
					<Typography component="h1" variant="h5">
						Forgot Password
					</Typography>
					<form onSubmit={this.onSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							value={email}
							id="email"
							onChange={this.onChange}
							error={this.error}
							helperText={
								errors.email
							}
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Send Link
						</Button>
						<Grid
							container
							justify="flex-end"
						>
							<Grid item>
								<Link
									to="/login"
									variant="body2"
								>
									Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withRouter(ResetPassword);
