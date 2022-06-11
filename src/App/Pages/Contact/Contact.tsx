import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import ContactForm from './ContactForm';
import Input from '../../../System/Components/FormControl/Input/Input';
import Checkbox from '../../../System/Components/FormControl/Checkbox/Checkbox';
import BindValidationModel from '../../../System/Components/BindModel/BindValidationModel';
import FadeInOut from '../../../System/Components/Animations/FadeInOut/FadeInOut';
import {
	createProxyModel,
	ProxyModel,
} from '../../../System/Models/ProxyModel';

import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Typography,
	Backdrop,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	createValidationProxy,
	ValidationProxyType,
} from '../../../System/Models/ValidationProxy';

const Contact = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const contactForm = useRef<ValidationProxyType<ProxyModel<ContactForm>>>(
		createValidationProxy(createProxyModel(new ContactForm()))
	);

	const isSubmitable: boolean =
		contactForm.current.isValid() && contactForm.current.isDirty;

	const onLoadFromJson = () => {
		contactForm.current.fromObject({
			email: 'test@example.com',
			full_name: 'test user',
			message: 'a sample message',
			termsAndConditionsAccepted: false,
		});
	};

	const onResetChanges = () => {
		contactForm.current.reset();
	};

	const onSubmitChanges = () => {
		contactForm.current.submit();
	};

	const onSubmitForm = async () => {
		if (!isSubmitable) {
			throw Error('Should not be able to call on not submitable form.');
		}

		setLoading(true);

		// simulate some api call
		await new Promise((r) => setTimeout(r, 2000));
		contactForm.current.submit();

		setLoading(false);
	};

	return (
		<FadeInOut>
			<div className="w-full mb-4">
				<Typography variant="h5">Get In Touch With Us</Typography>
			</div>

			<Alert severity="info" className="mb-4">
				A Contact form using mobx, a proxy and a validation model,
				class-transformer and class-validator to achieve an easy to use,
				featurefull and flexible way of managing forms.
			</Alert>

			<Card className="relative">
				<Backdrop open={loading} className="absolute z-5" />
				<CardContent>
					<div className="grid w-full">
						<div className="col-6">
							<BindValidationModel
								model={contactForm.current}
								property="fullName"
							>
								<Input
									label="Full Name"
									id="fullName"
									placeholder="Your name"
								/>
							</BindValidationModel>
						</div>
						<div className="col-6">
							<BindValidationModel model={contactForm.current} property="email">
								<Input label={'Email'} id="email" placeholder="Email address" />
							</BindValidationModel>
						</div>
						<div className="col-12">
							<BindValidationModel
								model={contactForm.current}
								property="message"
							>
								<Input
									multiline
									label="Message"
									id="message"
									placeholder="Message"
								/>
							</BindValidationModel>
						</div>
						<div className="col-12">
							<BindValidationModel
								model={contactForm.current}
								property="termsAndConditionsAccepted"
							>
								<Checkbox
									label="Accept the terms and conditions!"
									id="termsAndConditionsAccepted"
								/>
							</BindValidationModel>
						</div>
					</div>
				</CardContent>
				<CardActions>
					<div className="grid w-full align-items-center">
						<div className="col-8">
							<div className="flex flex-row gap-1 align-items-center">
								<Button
									variant="contained"
									size="small"
									onClick={onLoadFromJson}
								>
									Fill model with example
								</Button>
								<Button
									variant="contained"
									size="small"
									disabled={!contactForm.current.isDirty}
									onClick={onResetChanges}
								>
									Reset changes
								</Button>
								<Button
									variant="contained"
									size="small"
									disabled={!contactForm.current.isDirty}
									onClick={onSubmitChanges}
								>
									Submit changes
								</Button>
								<Chip
									label={contactForm.current.isDirty ? 'dirty' : 'not dirty'}
									color={contactForm.current.isDirty ? 'warning' : 'secondary'}
								/>
							</div>
						</div>
						<div className="col-4 text-right">
							<LoadingButton
								loading={loading}
								variant="contained"
								size="small"
								disabled={!isSubmitable}
								onClick={onSubmitForm}
							>
								Submit Form
							</LoadingButton>
						</div>
						<div className="col-12">
							<Alert severity="warning">
								A <strong>Proxy model</strong> will decorate the model with the
								following features:
								<ul>
									<li>
										Will act only on proxy data, and the original data is
										available through <strong>model</strong> property.
									</li>
									<li>
										<strong>reset</strong> method to reset to original data on
										the proxy
									</li>
									<li>
										<strong>submit</strong> method to submit changes to original
										state of data
									</li>
									<li>
										<strong>isDirty</strong> getter to get if the data has been
										modified on the proxy
									</li>
									<li>
										<strong>isDirtyPropertyDirty</strong> method to get if the
										property on data has been modified on the proxy
									</li>
								</ul>
							</Alert>
						</div>
						<div className="col-12">
							<Alert severity="info">
								<strong>Proxy data</strong> as json:
								<pre>{JSON.stringify(contactForm.current.toObject())}</pre>
							</Alert>
						</div>
						<div className="col-12">
							<Alert severity="info">
								<strong>Original data</strong> as json:
								<pre>
									{JSON.stringify(contactForm.current.model.toObject())}
								</pre>
							</Alert>
						</div>
						<div className="col-12">
							<Alert severity="warning">
								A <strong>Validation model</strong> will decorate the model with
								the following features:
								<ul>
									<li>
										Will observe property changes on the model and automatically
										validate it
									</li>
									<li>
										<strong>validate</strong> method to validate the data
									</li>
									<li>
										<strong>isValid</strong> getter will tell if the data is
										valid
									</li>
									<li>
										<strong>errors</strong> getter to get all of the errors
									</li>
									<li>
										<strong>getPropertyErrors</strong> getter to get if the data
										has been modified on the proxy
									</li>
									<li>
										<strong>hasPropertyError</strong> method to check if a
										property has error
									</li>
								</ul>
							</Alert>
						</div>
					</div>
				</CardActions>
			</Card>
		</FadeInOut>
	);
};

export default observer(Contact);
