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
    IonItem
} from "@ionic/react";

export default function List(params) {
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>List</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            <div className="full-height">
                <IonGrid className="full-height">
                    <IonRow className="full-height ion-justify-content-center ion-align-items-center">
                        <IonList class="ion-padding">
                            <IonRow class="ion-justify-content-center ion-margin">
                                <IonLabel>Welcome to Comp Labs Meet</IonLabel>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonItem>
                                    <IonLabel position="floating">Enter Meeting Name</IonLabel>
                                    <IonInput value={'MeetingName.Jitsi.joinConference.roomName'}></IonInput>
                                </IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonButton routerLink="/Video">Create / Join</IonButton>
                            </IonRow>
                         
                        </IonList>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
}