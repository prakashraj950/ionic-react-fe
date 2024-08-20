import React, { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonMenuButton,
    IonText
} from '@ionic/react';
import moment from 'moment';
import { addUserData } from '../../redux/Slices/common/commonSlice';
import { useDispatch } from 'react-redux';
import { scrollIntoViewError } from '../../utils';

const initialState = { name: "", phone: "", entry_time: null, exit_time: "" };

export default function Form() {
    const dispatch = useDispatch()

    const [inputData, setInputData] = useState(initialState);
    const [inputError, setInputError] = useState({});

    const validateInputs = () => {
        let errors = {};
        let isValid = true;

        // Validate Name
        if (!inputData.name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
            scrollIntoViewError('name')
        }

        // Validate Phone
        if (!/^[6-9][0-9]{9}$/.test(inputData.phone)) {
            errors.phone = "Please enter a valid Indian phone number.";
            isValid = false;
            scrollIntoViewError('phone')
        }

        // Validate Entry Time
        if (!inputData.entry_time) {
            errors.entry_time = "Time of entry is required.";
            isValid = false;
            scrollIntoViewError('entry_time')
        }

        // Validate Exit Time
        if (!inputData.exit_time) {
            errors.exit_time = "Time of exit is required.";
            isValid = false;
            scrollIntoViewError('exit_time')
        } else if (moment(inputData.exit_time).isBefore(moment(inputData.entry_time))) {
            errors.exit_time = "Exit time must be after entry time.";
            isValid = false;
            scrollIntoViewError('exit_time')
        }

        setInputError(errors);
        return isValid;
    };

    const handleSubmit = () => {
        const isValid = validateInputs()
        if (!isValid) return;

        console.log('after');


        const formData = new FormData();

        formData.append("name", inputData?.name);
        formData.append("phone", inputData?.phone);
        formData.append("entry_time", inputData?.entry_time);
        formData.append("exit_time", inputData?.exit_time);

        dispatch(addUserData(formData))

    };

    const handleOnchange = (e) => {
        const { event, value } = e.detail;

        if (event.target.name === "phone") {
            if (/^[0-9]*$/.test(value)) {
                setInputData(prev => ({
                    ...prev,
                    [event.target.name]: value
                }));
            }
        } else {
            setInputData(prev => ({
                ...prev,
                [event.target.name]: value
            }));
        }

        setInputError(prev => ({
            ...prev,
            [event.target.name]: false
        }));
    };

    const handleDateField = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({
            ...prev,
            [name]: value
        }));
        setInputError(prev => ({
            ...prev,
            [name]: false
        }));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Form</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid className="full-height ion-padding">
                    <IonRow className="form-row ion-justify-content-center">
                        <IonCol size="12" size-md="8" size-lg="8">
                            <IonItem lines="inset" id='name'  className="ion-margin-bottom">
                                <IonInput
                                    value={inputData.name}
                                    label="Name"
                                    labelPlacement="floating"
                                    placeholder="Enter your name"
                                    name='name'
                                    onIonInput={handleOnchange}

                                />
                                {inputError.name && <IonText color="danger" className="ion-padding-start">{inputError.name}</IonText>}
                            </IonItem>

                            <IonItem lines="inset" id='phone' className="ion-margin-bottom">
                                <IonInput
                                    value={inputData.phone}
                                    type="tel"
                                    inputmode="numeric"
                                    label="Phone Number(+91)"
                                    labelPlacement="floating"
                                    placeholder="Enter your phone number"

                                    name='phone'
                                    onIonInput={handleOnchange}
                                    maxlength={10}
                                    pattern="[0-9]*"
                                />
                                {inputError.phone && <IonText color="danger" className="ion-padding-start">{inputError.phone}</IonText>}
                            </IonItem>

                            <IonItem lines="inset" className="ion-justify-content-center ion-margin-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
                                        <div style={{ marginBottom: '25px' }}>
                                            <IonLabel position="fixed">Time of Entry</IonLabel>
                                        </div>
                                    </IonRow>
                                    <IonRow>
                                        <IonDatetime
                                            displayFormat="h:mm A"
                                            value={inputData.entry_time}
                                            className='ion-align-self-center'
                                            placeholder="Select entry time"

                                            name='entry_time'
                                            onIonChange={handleDateField}
                                            max={moment().format("YYYY-MM-DDTHH:mm:ss")}
                                        />
                                        {inputError.entry_time && <IonText color="danger" id='entry_time' className="ion-padding-start">{inputError.entry_time}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <IonItem lines="inset" className="ion-justify-content-center ion-margin-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
                                        <div style={{ marginBottom: '25px' }}>
                                            <IonLabel position="fixed">Time of Exit</IonLabel>
                                        </div>
                                    </IonRow>
                                    <IonRow>
                                        <IonDatetime
                                            displayFormat="h:mm A"
                                            value={inputData.exit_time}
                                            className='ion-align-self-center'
                                            placeholder="Select exit time"

                                            name='exit_time'
                                            onIonChange={handleDateField}
                                            min={inputData.entry_time ? moment(inputData.entry_time).format("YYYY-MM-DDTHH:mm:ss") : ""}
                                        />
                                        {inputError.exit_time && <IonText id='exit_time' color="danger" className="ion-padding-start">{inputError.exit_time}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IonButton onClick={handleSubmit} className='ion-align-self-center'>
                                    Submit
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}
