import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter } from 'reactstrap';
import { getBase64 } from '../../helpers/get-base64';

type TFitnessInputForm = Omit<IFitness,'id'>;

const AddFitness = () => {
  const [isFitnessModalOpen, setFitnessModalOpen] = useState(false);
  const toggleModal = () => setFitnessModalOpen(!isFitnessModalOpen);

  const [inputForm, setInputForm] = useState<Omit<IFitness,'id'>>({
    type: '',
    img: ''
  });

  const onInputChange = (key: keyof TFitnessInputForm) => async (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;

    if (key === 'img' && event.currentTarget.files) {
      value = await getBase64(event.currentTarget.files[0]) as string;
    }

    setInputForm({
      ...inputForm,
      [key]: value
    });
  };

  const onSubmitAddFitness = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/api/fitness', inputForm);

      alert('Fitness Type Added');
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }

  return (
    <>
      <Button
        color="primary"
        onClick={toggleModal}
      >
        Add Fitness Type
      </Button>
      <Modal
        centered
        isOpen={isFitnessModalOpen}
        toggle={toggleModal}
      >
        <Form onSubmit={onSubmitAddFitness}>
          <ModalHeader toggle={toggleModal}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                placeholder="Username"
                onChange={onInputChange('type')}
                value={inputForm.type}
              />
            </FormGroup>
            <FormGroup>
              <Input
                accept="image/*"
                onChange={onInputChange('img')}
                type="file"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
            >
              Submit
            </Button>
            {' '}
            <Button onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddFitness;