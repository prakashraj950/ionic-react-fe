import React, { useEffect, useState } from 'react';
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
    IonText,
    useIonViewDidEnter,
    useIonViewDidLeave
} from '@ionic/react';
import moment from 'moment';
import { addUserData, getUserDataById, openSnackbar, setAddUserDataToNull, setGetUserDataByIdToNull, setUpdateUserDataToNull, updateUserData } from '../../redux/Slices/common/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLastKey, scrollIntoViewError } from '../../utils';
import { useParams } from 'react-router';

const initialState = { name: "", phone: "", entry_time: null, exit_time: "" };

export default function Form() {
    const dispatch = useDispatch()

    const { id: editId } = useParams();

    const [inputData, setInputData] = useState(initialState);
    const [inputError, setInputError] = useState({});

    const userDataById = useSelector(state => state.commonData?.getUserDataById)
    const userDataByIdLoading = useSelector(state => state.commonData?.getUserDataByIdLoading)

    const addUserDataState = useSelector(state => state.commonData?.addUserData);
    const updateUserDataState = useSelector(state => state.commonData?.updateUserData);


    const reset = () => {
        setInputData({ ...initialState })
        setInputError({})
    }

    useIonViewDidEnter(() => {

    });

    useIonViewDidLeave(() => {
        dispatch(setGetUserDataByIdToNull())
        reset()
    });


    useEffect(() => {
        if (editId) {
            dispatch(getUserDataById({ id: editId }))
        }

        return () => {
            dispatch(setGetUserDataByIdToNull())
            dispatch(setAddUserDataToNull())
            dispatch(setUpdateUserDataToNull())

        }

    }, [])

    useEffect(() => {
        if (
            userDataById?.status === "success"
            && userDataById?.data?.doc && editId
        ) {
            const editData = userDataById?.data?.doc;



            setInputData(prev => ({
                name: editData.name,
                phone: editData?.phone,
                entry_time: editData?.entry_time,
                exit_time: editData?.exit_time,
            }))

            dispatch(setGetUserDataByIdToNull())
        }

        if (userDataById?.status === "error" && editId) {
            dispatch(openSnackbar({ message: userDataById?.message, severity: 'warning' }))
            setTimeout(() => {
                dispatch(setGetUserDataByIdToNull())
                window.location.href = "/list"
            }, 2000)
        }
    }, [userDataById]);


    useEffect(() => {

        if (addUserDataState?.status === "success" && addUserDataState?.data?.doc) {
            dispatch(openSnackbar({ message: addUserDataState?.message, severity: 'success' }))
            dispatch(setAddUserDataToNull())
            reset()
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else if (addUserDataState?.status === "error" &&
            addUserDataState?.error?.name === "ValidationError" &&
            typeof addUserDataState?.error?.errors === "object"
        ) {

            const formattedErrors = Object.keys(addUserDataState?.error?.errors).reduce((acc, key) => {
                acc[key] = addUserDataState?.error?.errors[key].message;
                return acc;
            }, {});

            scrollIntoViewError(getLastKey(formattedErrors))
            setInputError(prev => ({ ...formattedErrors }))
            dispatch(setAddUserDataToNull())


        } else if (addUserDataState?.status === "error"
            && addUserDataState?.error
            // && typeof addUserDataState?.error === "string"
        ) {

            dispatch(openSnackbar({ message: addUserDataState?.message, severity: 'warning' }))
            dispatch(setAddUserDataToNull())
        }

    }, [addUserDataState])


    useEffect(() => {

        if (updateUserDataState?.status === "success" && updateUserDataState?.data?.doc) {
            dispatch(openSnackbar({ message: updateUserDataState?.message, severity: 'success' }))
            dispatch(setUpdateUserDataToNull())
            reset()
            setTimeout(() => {
                window.location.href = "/list"
            }, 2000)
        }
        else if (updateUserDataState?.status === "error" &&
            updateUserDataState?.error?.name === "ValidationError" &&
            typeof updateUserDataState?.error?.errors === "object"
        ) {

            const formattedErrors = Object.keys(updateUserDataState?.error?.errors).reduce((acc, key) => {
                acc[key] = updateUserDataState?.error?.errors[key].message;
                return acc;
            }, {});

            scrollIntoViewError(getLastKey(formattedErrors))
            setInputError(prev => ({ ...formattedErrors }))
            dispatch(setUpdateUserDataToNull())


        } else if (updateUserDataState?.status === "error"
            && updateUserDataState?.error
            // && typeof updateUserDataState?.error === "string"
        ) {

            dispatch(openSnackbar({ message: updateUserDataState?.message, severity: 'warning' }))
            dispatch(setUpdateUserDataToNull())
        }

    }, [updateUserDataState])



    const validateInputs = () => {
        let errors = {};
        let isValid = true;


        if (!inputData.name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
            scrollIntoViewError('name')
        }


        if (!/^[6-9][0-9]{9}$/.test(inputData.phone)) {
            errors.phone = "Please enter a valid  phone number.";
            isValid = false;
            scrollIntoViewError('phone')
        }


        if (!inputData.entry_time) {
            errors.entry_time = "Time of entry is required.";
            isValid = false;
            scrollIntoViewError('entry_time')
        }


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

        const formData = new FormData();

        formData.append("name", inputData?.name);
        formData.append("phone", inputData?.phone);
        formData.append("entry_time", inputData?.entry_time);
        formData.append("exit_time", inputData?.exit_time);

        if (editId) {

            dispatch(updateUserData({ id: editId, formData }))

        } else dispatch(addUserData(formData))

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

    // dispatch(openSnackbar({ message: 'hellos', severity: 'success' }))

    return (
        <IonPage>
            <IonHeader className="ion-header-custom">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{editId ? "Edit" : null} Form</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid className="full-height ion-padding">
                    <IonRow className="form-row ion-justify-content-center">
                        <IonCol size="12" size-md="8" size-lg="8">
                            <IonItem lines="inset" id='name' className="ion-margin-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
                                        <IonInput
                                            value={inputData.name}
                                            label="Name"
                                            labelPlacement="floating"
                                            placeholder="Enter your name"
                                            name='name'
                                            onIonInput={handleOnchange}
                                            fill="outline"
                                            className='ion-margin-bottom'
                                        />
                                    </IonRow>
                                    <IonRow>
                                        {inputError.name && <IonText color="danger" className="">{inputError.name}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <IonItem lines="inset" id='phone' className="ion-margin-bottom ion-padding-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
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
                                            fill="outline"
                                            className='ion-margin-bottom'
                                        />
                                    </IonRow>
                                    <IonRow>
                                        {inputError.phone && <IonText color="danger" className="">{inputError.phone}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <IonItem lines="inset" id='entry_time' className="ion-justify-content-center ion-margin-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
                                        <div style={{ marginBottom: '25px' }}>
                                            <IonLabel position="fixed">Time of Entry</IonLabel>
                                        </div>
                                    </IonRow>
                                    <IonRow className='ion-justify-content-center'>
                                        <IonDatetime
                                            displayFormat="h:mm A"
                                            value={inputData.entry_time}
                                            className='ion-align-self-center'
                                            placeholder="Select entry time"
                                            name='entry_time'
                                            onIonChange={handleDateField}
                                            max={moment().format("YYYY-MM-DDTHH:mm:ss")}
                                        />
                                    </IonRow>
                                    <IonRow className='ion-margin-vertical ion-justify-content-end'>
                                        {inputError.entry_time && <IonText color="danger" className="">{inputError.entry_time}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <IonItem lines="inset" id='exit_time' className="ion-justify-content-center ion-margin-bottom">
                                <IonGrid className="full-height">
                                    <IonRow>
                                        <div style={{ marginBottom: '25px' }}>
                                            <IonLabel position="fixed">Time of Exit</IonLabel>
                                        </div>
                                    </IonRow>
                                    <IonRow className='ion-justify-content-center'>
                                        <IonDatetime
                                            displayFormat="h:mm A"
                                            value={inputData.exit_time}
                                            className='ion-align-self-center'
                                            placeholder="Select exit time"
                                            name='exit_time'
                                            onIonChange={handleDateField}
                                            min={inputData.entry_time ? moment(inputData.entry_time).format("YYYY-MM-DDTHH:mm:ss") : null}
                                        />
                                    </IonRow>

                                    <IonRow className='ion-margin-vertical ion-justify-content-end'>
                                        {inputError.exit_time && <IonText color="danger" className="">{inputError.exit_time}</IonText>}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IonButton onClick={handleSubmit} className='ion-align-self-center'>                                    
                                    {editId ? "Update" : "Submit"}
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}
