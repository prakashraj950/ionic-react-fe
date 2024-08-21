import {
    IonPage,
    IonContent,
    IonButton,
    IonButtons,
    IonGrid,
    IonHeader,
    IonLabel,
    IonList,
    IonMenuButton,
    IonRow, IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonCol,
    IonPopover,
    IonCard,
    IonCardContent,
    IonIcon,
    useIonViewDidEnter,
    useIonViewDidLeave
} from "@ionic/react";
import { useEffect, useState } from "react";
import { ellipsisVertical, navigate } from 'ionicons/icons';
import { useDispatch, useSelector } from "react-redux";
import { deleteUserDataById, getUserData, openSnackbar, setDeleteUserDataByIdToNull, setGetUserDataToNull } from "../../redux/Slices/common/commonSlice";
import moment from "moment";
import Alert from "../../components/Common/Alert";

export default function List(params) {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [popoverState, setPopoverState] = useState({ showPopover: false, event: undefined, selectedRow: null });


    const userData = useSelector(state => state.commonData?.getUserData)
    const userDataLoading = useSelector(state => state.commonData?.getUserDataLoading)
    const deleteUserDataByIdState = useSelector(state => state.commonData?.deleteUserDataById)

    useIonViewDidEnter(() => {
        dispatch(getUserData());
    });

    useIonViewDidLeave(() => {
        dispatch(setGetUserDataToNull())
    });  



    useEffect(() => {
        if (userData?.status === "success" && Array.isArray(userData?.data?.data)) {
            setData(userData?.data?.data)
        } else if (userDataLoading === false) {
            setData([])
        }

    }, [userData])


    useEffect(() => {
        if (deleteUserDataByIdState?.status === "success") {
            dispatch(getUserData())
            dispatch(openSnackbar({ message: "Record deleted successfully", severity: "success" }))
            dispatch(setDeleteUserDataByIdToNull())
        }
    }, [deleteUserDataByIdState])



    const handleEdit = (id) => {
        console.log("Edit row with ID:", id);

        // navigate(`edit/${id}`)
        window.location.href = `/edit/${id}`;
        setPopoverState({ showPopover: false, event: undefined, selectedRow: null });
    };

    const handleDelete = (id) => {
        console.log("Delete row with ID:", id);

        dispatch(deleteUserDataById({ id }))
        setPopoverState({ showPopover: false, event: undefined, selectedRow: null });
    };

    const openPopover = (e, id) => {

        setPopoverState({ showPopover: true, event: e, selectedRow: id });
    };




    return <IonPage>

        <IonHeader className="ion-header-custom">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>List</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>



            <IonGrid className="ion-padding">
                <IonRow>
                    <IonCol size="12">
                        <IonCard>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow className="header-row" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                                        <IonCol>Name</IonCol>
                                        <IonCol>Phone No</IonCol>
                                        <IonCol>Time of Entry</IonCol>
                                        <IonCol>Time of Exit</IonCol>
                                        <IonCol>Action</IonCol>
                                    </IonRow>
                                    {data.map((row) => (
                                        <IonRow key={row._id} className="data-row">
                                            <IonCol>{row.name}</IonCol>
                                            <IonCol>{row.phone}</IonCol>
                                            <IonCol>{moment(row.entry_time).format("YYYY-MM-DD HH:mm:ss")}</IonCol>
                                            <IonCol>{moment(row.exit_time).format("YYYY-MM-DD HH:mm:ss")}</IonCol>
                                            <IonCol>
                                                <IonButton fill="clear" onClick={(e) => openPopover(e, row._id)} size="small">
                                                    <IonIcon slot="icon-only" icon={ellipsisVertical} />
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    ))}
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <IonPopover
                isOpen={popoverState.showPopover}
                event={popoverState.event}
                onDidDismiss={() => setPopoverState({ showPopover: false, event: undefined, selectedRow: null })}
            >
                <IonList>
                    <IonItem style={{}} lines="none" button onClick={() => handleEdit(popoverState.selectedRow)}>
                        <IonLabel>Edit</IonLabel>
                    </IonItem>
                    <IonItem button lines="none" id="present-alert">
                        <IonLabel>Delete</IonLabel>
                        <Alert
                            handleOk={() => handleDelete(popoverState.selectedRow)}
                            handleCancel={() => setPopoverState({ showPopover: false, event: undefined, selectedRow: null })}
                            header="Do want to delete?"
                            trigger="present-alert"
                        />
                    </IonItem>
                </IonList>
            </IonPopover>
        </IonContent>
    </IonPage>
}