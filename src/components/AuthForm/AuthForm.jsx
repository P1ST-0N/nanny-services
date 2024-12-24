import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton.jsx";
import Icon from "../Icon/Icon.jsx";

import authOperations from "../../redux/auth/operations.js";
import authSelectors from "../../redux/auth/selectors.js";
import schemas from "../../schemas";
import css from "./AuthForm.module.css";

import { useLocation } from "react-router-dom";
