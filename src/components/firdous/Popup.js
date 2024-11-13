import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const Popup = ({heading='PeaceRadio',message,open,setOpen, onSuccessHandler,noClose=false}) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
    <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {heading}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            {!noClose &&<Button onClick={handleClose}>Cancel</Button>}
            <Button onClick={() => {
                handleClose()
                onSuccessHandler && onSuccessHandler()
            }
                } autoFocus>
                Ok
            </Button>
            </DialogActions>
    </Dialog>);
}
export default Popup;