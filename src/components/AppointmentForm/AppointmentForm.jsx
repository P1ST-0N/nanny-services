import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import toast from "react-hot-toast";

import Button from "../Button/Button";

import authSelectors from "../../redux/auth/selectors.js";
import schemas from "../../schemas";
import CloseButton from "../CloseButton/CloseButton.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./AppointmentForm.module.css";
import "./timeSelect.css";

const defaultValues = () => ({
  nannyId: "",
  address: "",
  phone: "",
  childAge: "",
  time: "",
  email: "",
  parent: "",
  comment: "",
});

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="clock" width={20} height={20} />
    </components.DropdownIndicator>
  );
};

function AppointmentForm({ nanny, onClose }) {
  const user = useSelector(authSelectors.user);
  const {
    register,
    handleSubmit,

    formState: { errors },
    control,
  } = useForm({
    defaultValues: { ...defaultValues(), email: user.email, nannyId: nanny.id },
    resolver: yupResolver(schemas.appointment),
  });

  const onSubmit = () => {
    toast.success("The form is successfully submitted!");
    onClose(false);
  };

  return (
    <>
      <CloseButton onClick={() => onClose(false)} />
      <h2 className={css.heading}>Make an appointment with a babysitter</h2>
      <p className={css.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>
      <div className={css.nannyContainer}>
        <div
          className={css.thumb}
          style={{ backgroundImage: `url(${nanny.avatar_url})` }}
        ></div>
        <div>
          <p className={css.nannyPosition}>Your nanny</p>
          <p className={css.nannyName}>{nanny.name} </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputGroup}>
          <div className={`${css.inputWrapper} ${css.inputWrapperAdd}`}>
            <input
              {...register("address")}
              className={css.input}
              type="text"
              placeholder="Address"
            />
            {errors.address && (
              <p className={css.errorText}>{`*${errors.address.message}`}</p>
            )}
          </div>
          <div className={`${css.inputWrapper} ${css.inputWrapperAdd}`}>
            <input
              {...register("phone")}
              className={css.input}
              type="text"
              placeholder="+38..."
              maxLength="13"
            />
            {errors.phone && (
              <p className={css.errorText}>{`*${errors.phone.message}`}</p>
            )}
          </div>
        </div>
        <div className={css.inputGroup}>
          <div className={`${css.inputWrapper} ${css.inputWrapperAdd}`}>
            <input
              {...register("childAge")}
              className={css.input}
              type="text"
              placeholder="Child's age"
              maxLength="2"
            />
            {errors.childAge && (
              <p className={css.errorText}>{`*${errors.childAge.message}`}</p>
            )}
          </div>
          <div className={`${css.inputWrapper} ${css.inputWrapperAdd}`}>
            <Controller
              render={({ field }) => (
                <Select
                  placeholder="00:00"
                  components={{ DropdownIndicator }}
                  onChange={(selected) => field.onChange(selected.value)}
                  className="time-select-container"
                  classNamePrefix="time-select"
                  options={[
                    {
                      label: "Meeting time",
                      options: [
                        { value: "09:00", label: "09:00" },
                        { value: "09:30", label: "09:30" },
                        { value: "10:00", label: "10:00" },
                        { value: "10:30", label: "10:30" },
                      ],
                    },
                  ]}
                  isSearchable={false}
                  // menuIsOpen={true}
                />
              )}
              name="time"
              control={control}
            />
            {errors.time && (
              <p className={css.errorText}>{`*${errors.time.message}`}</p>
            )}
          </div>
        </div>
        <div className={css.inputWrapper}>
          <input
            {...register("email")}
            className={css.input}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <p className={css.errorText}>{`*${errors.email.message}`}</p>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            {...register("parent")}
            className={css.input}
            type="text"
            placeholder="Father's or mother's name"
          />
          {errors.parent && (
            <p className={css.errorText}>{`*${errors.parent.message}`}</p>
          )}
        </div>
        <div className={css.inputWrapper}>
          <textarea
            {...register("comment")}
            className={`${css.input} ${css.comment}`}
            type="text"
            placeholder="Comment"
          ></textarea>
          {errors.comment && (
            <p className={css.errorText}>{`*${errors.comment.message}`}</p>
          )}
        </div>
        <Button type="submit" className={css.button} filled={true}>
          Send
        </Button>
      </form>
    </>
  );
}

export default AppointmentForm;
