"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/userRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      console.log(callback);

      if (callback?.ok) {
        toast.success("loged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const boodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login in your Acount" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        label="continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div
        className="
                  text-neutral-500
                  text-center
                  mt-4
                  font-light
                ">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>First time using Airbnb</div>
          <div
            onClick={toggle}
            className="
                      text-neutral-800
                      cursor-pointer
                      hover:underline
                    ">
            Create an account!
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={boodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
