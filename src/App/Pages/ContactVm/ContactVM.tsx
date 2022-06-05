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

type ContactVMProps = {
  fancy?: boolean;
} & HTMLMotionProps<"div">;

const ContactVM = ({
  fancy,
  viewModel,
  ...props
}: WithViewModelProps<ContactViewModel> & ContactVMProps) => (
  <FadeInOut {...props}>
    <>
    {console.log("rendered")}
    {/**{viewModel.loading && <Loader />} */}
    <h1 style={fancy ? { background: "red" } : {}}>
      {viewModel.contactForm.model.email}
    </h1>
    <BindModel
      model={viewModel.contactForm}
      property="fullName"
      afterChange={() => viewModel.contactForm.validate()}
      dataTransformers={[TrimDataTransformer]}
    >
      <Input label="Full Name" id="fullName" placeholder="Your name" />
    </BindModel>
    <BindModel
      model={viewModel.contactForm}
      property="email"
      afterChange={() => viewModel.contactForm.validate()}
    >
      <Input label={`Email`} id="email" placeholder="Email address" />
    </BindModel>
    <BindModel
      model={viewModel.contactForm}
      property="message"
      afterChange={() => viewModel.contactForm.validate()}
    >
      <Input
        multiline
        rows={2}
        label="Message"
        id="message"
        placeholder="Message"
      />
    </BindModel>
    <hr />
    {viewModel.contactForm.isDirty ? "dirty" : "not dirty"}
    <button onClick={viewModel.onLoadFromJson.bind(viewModel)}>
      Load model
    </button>
    <button onClick={viewModel.onResetChanges.bind(viewModel)}>
      Reset changes
    </button>
    <button onClick={viewModel.onSubmitChanges.bind(viewModel)}>
      Submit changes
    </button>
    <hr />
    proxy as json: {JSON.stringify(viewModel.contactForm.toObject())}
    <br />
    original as json: {JSON.stringify(viewModel.contactForm.model.toObject())}
    <hr />
    {viewModel.contactForm.isValid ? "Valid" : "Not Valid"}
    </>
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
