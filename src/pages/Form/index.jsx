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
    IonMenuButton
} from '@ionic/react';

const initialState = { name: "", phone: "", entry_time: "", exit_time: "" }
export default function Form(params) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [entryTime, setEntryTime] = useState('');
    const [exitTime, setExitTime] = useState('');
    const [inputData, setInputData] = useState(initialState)
    const [inputError, setInputError] = useState({})

    const handleSubmit = () => {
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Entry Time:', entryTime);
        console.log('Exit Time:', exitTime);

        // Clear the form
        setName('');
        setPhone('');
        setEntryTime('');
        setExitTime('');
    };

    const handleOnchange = (e) => {
        const { event, value } = e.detail;

        setInputData(prev => ({
            ...prev,
            [event.target.name]: value
        }))
        setInputError(prev => ({
            ...prev,
            [event.target.name]: false
        }))

    }

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
                            <IonItem lines="inset" className="ion-margin-bottom">

                                <IonInput
                                    value={name}
                                    label="Name"
                                    labelPlacement="floating"
                                    placeholder="Enter your name"
                                    name='name'
                                    onIonChange={handleOnchange}

                                />
                            </IonItem>

                            <IonItem lines="inset" className="ion-margin-bottom">
                                <IonInput
                                    value={phone}
                                    type="tel"
                                    label="Phone Number"
                                    labelPlacement="floating"
                                    placeholder="Enter your phone number"
                                    name='phone'
                                    onIonChange={handleOnchange}
                                    maxlength={20}
                                />
                            </IonItem>

                            <IonItem lines="inset" className="ion-justify-content-center ion-margin-bottom">
                                <IonLabel position="floating" style={{ marginBottom: '25px' }}>Time of Entry</IonLabel>
                                <IonDatetime
                                    displayFormat="h:mm A"
                                    value={entryTime}
                                    className='ion-align-self-center'
                                    placeholder="Select entry time"
                                    name='entry_time'
                                    onIonChange={handleOnchange}
                                />
                            </IonItem>

                            <IonItem lines="inset" className="ion-justify-content-center ion-margin-bottom">
                                <div> <IonLabel position="floating" style={{ marginBottom: '25px' }}>Time of Exit</IonLabel></div>
                                <IonDatetime
                                    displayFormat="h:mm A"
                                    value={exitTime}
                                    className='ion-align-self-center'
                                    placeholder="Select exit time"
                                    name='exit_time'
                                    onIonChange={handleOnchange}
                                    
                                />
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
