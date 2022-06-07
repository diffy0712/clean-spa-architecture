import Input from "../../../System/Components/FormControl/Input/Input";
import BindModel from "../../../System/Components/BindModel/BindModel";
import ContactViewModel, { ContactViewModelProps } from "./ContactViewModel";
import withViewModel, {
  WithViewModelProps
} from "../../../System/Components/Hoc/withViewModel";
import TrimDataTransformer from "../../../System/DataTransformers/TrimDataTransformer";
import Loader from "../../../System/Components/Loader/Loader";
import FadeInOut from "../../../System/Components/Animations/FadeInOut/FadeInOut";
import { HTMLMotionProps } from "framer-motion";
import { Alert, Backdrop, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BindValidationModel from "../../../System/Components/BindModel/BindValidationModel";
import Checkbox from "../../../System/Components/FormControl/Checkbox/Checkbox";
import { LoadingButton } from "@mui/lab";

type ContactVMProps = {
  fancy?: boolean;
} & HTMLMotionProps<"div">;

const ContactVM = ({
  fancy,
  viewModel,
  ...props
}: WithViewModelProps<ContactViewModel> & ContactVMProps) => (
  <FadeInOut {...props}>
    <div className="w-full mb-4">
      <Typography variant="h5">Get In Touch With Us</Typography>
    </div>
    <Alert severity="info" className="mb-4">
      The same contact form as <Link to="/contact">Contact</Link>, but using a ViewModel.
      All of the business logic of this component was extracted into it's ViewModel class.
      This way the component and it's business logic are decoupled.
    </Alert>
    <Card className="relative">
      <Backdrop open={viewModel.loading} className="absolute z-5" />
      <CardContent>
        <div className="grid w-full">
          <div className="col-6">
            <BindValidationModel
              model={viewModel.contactForm}
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
            <BindValidationModel model={viewModel.contactForm} property="email">
              <Input label={`Email`} id="email" placeholder="Email address" />
            </BindValidationModel>
          </div>
          <div className="col-12">
            <BindValidationModel
              model={viewModel.contactForm}
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
              model={viewModel.contactForm}
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
                onClick={viewModel.onLoadFromJson.bind(viewModel)}
              >
                Fill model with example
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={!viewModel.contactForm.isDirty}
                onClick={viewModel.onResetChanges.bind(viewModel)}
              >
                Reset changes
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={!viewModel.contactForm.isDirty}
                onClick={viewModel.onSubmitChanges.bind(viewModel)}
              >
                Submit changes
              </Button>
              <Chip
                label={viewModel.contactForm.isDirty ? "dirty" : "not dirty"}
                color={viewModel.contactForm.isDirty ? "warning" : "secondary"}
              />
            </div>
          </div>
          <div className="col-4 text-right">
            <LoadingButton
              loading={viewModel.loading}
              variant="contained"
              size="small"
              disabled={!viewModel.isSubmittable}
              onClick={viewModel.onSubmitForm.bind(viewModel)}
            >
              Submit Form
            </LoadingButton>
          </div>
          <div className="col-12">
            <Alert severity="info">
              <strong>Proxy data</strong> as json:
              <pre>{JSON.stringify(viewModel.contactForm.toObject())}</pre>
            </Alert>
          </div>
          <div className="col-12">
            <Alert severity="info">
              <strong>Original data</strong> as json:
              <pre>
                {JSON.stringify(viewModel.contactForm.model.toObject())}
              </pre>
            </Alert>
          </div>
        </div>
      </CardActions>
    </Card>
  </FadeInOut>
);

ContactVM.defaultProps = {
  fancy: false
};

export default withViewModel<
  ContactVMProps,
  ContactViewModel,
  ContactViewModelProps
>(ContactVM, ContactViewModel, ContactViewModelProps);
