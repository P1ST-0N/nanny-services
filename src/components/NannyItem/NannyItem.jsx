import { useState } from "react";

import ModalContainer from "../../components/ModalContainer/ModalContainer";
import Button from "../Button/Button";
import NannyItemButton from "../NannyItemButton/NannyItemButton";
import NannyItemHeader from "../NannyItemHeader/NannyItemHeader";
import NannyItemFeatureList from "../NannyItemFeatureList/NannyItemFeatureList";
import NannyItemPhoto from "../NannyItemPhoto/NannyItemPhoto";
import NannyItemReviewsList from "../NannyItemReviewsList/NannyItemReviewsList";

import css from "./NannyItem.module.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

function NannyItem({ item = {} }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenReviews, setIsOpenReviews] = useState(false);

  const handleModalOpenClose = (state) => {
    setIsOpenModal(state);
  };

  return (
    <li className={css.container}>
      <div className={css.leftSide}>
        <NannyItemPhoto item={item} />
      </div>
      <div className={css.rightSide}>
        <NannyItemHeader item={item} />
        <NannyItemFeatureList item={item} />
        <p className={css.description}>{item.about}</p>
        {isOpenReviews && (
          <>
            <NannyItemReviewsList list={Object.values(item.reviews)} />
            <div className={css.buttonsList}>
              <Button
                filled={true}
                className={css.appointment}
                onClick={() => setIsOpenModal(true)}
              >
                Make an appointment
              </Button>
              <NannyItemButton onClick={() => setIsOpenReviews(false)}>
                Collapse
              </NannyItemButton>
            </div>
          </>
        )}
        {!isOpenReviews && (
          <NannyItemButton onClick={() => setIsOpenReviews(true)}>
            Read More
          </NannyItemButton>
        )}
      </div>
      <ModalContainer
        isOpen={isOpenModal}
        className={css.modal}
        onClose={handleModalOpenClose}
      >
        <AppointmentForm nanny={item} onClose={handleModalOpenClose} />
      </ModalContainer>
    </li>
  );
}

export default NannyItem;
