import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import AuthenticationForm from "./AuthenticationForm";

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export default function AuthenticationModal({ isOpen, onClose }: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", sm: "xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <AuthenticationForm onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
