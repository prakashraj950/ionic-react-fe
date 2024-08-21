import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonToast } from '@ionic/react';
import { resetSnackBarData } from '../../redux/Slices/common/commonSlice';

export default function Toastbar({ }) {
    const [open, setOpen] = React.useState(false);
    const [snackBarState, setSnackBarState] = React.useState({});
    const dispatch = useDispatch();

    const snackBarData = useSelector(state => state.commonData);

    React.useEffect(() => {

        if (snackBarData?.openStatus === true) {
            setSnackBarState(snackBarData);
            dispatch(resetSnackBarData());
            setOpen(true);
        } else if (snackBarData?.openStatus === true && snackBarState && open) {
            setOpen(false);
        }
    }, [snackBarData])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        dispatch(resetSnackBarData());

    };




    return (
        <div>
            <IonToast
                color={snackBarState?.severity}
                isOpen={open}
                message={snackBarState?.message}
                onDidDismiss={handleClose}
                duration={5000}
            ></IonToast>

        </div>
    );
}
