import TextField from '@mui/material/TextField';

const CustomTextField=(props)=>{
    return (<TextField
    disabled={props.disabled}
    required={props.type !== 'email'}
    type={props.type? props.type:"text"}
    size="small"
    label={props.label}
    placeholder={props.placeholder}
    onChange={(e)=>props.onChange(e.target.value)}
    value={props.value}
    InputLabelProps={{
      shrink: true, // Keeps the label always visible (shrinks it when focused)
      sx: {
        fontSize: '16px', // Adjust the label font size
        fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
        fontWeight:"bold",
        }}}
    inputProps={{
      style: {
        fontSize: '14px', // Adjust the font size for the input text and placeholder
        fontFamily: '"Noto Sans Malayalam", sans-serif', // Use an inbuilt Malayalam font
      },
      sx: {
        '&::-webkit-outer-spin-button': {
        display: 'none',
        },
        '&::-webkit-inner-spin-button': {
        display: 'none',
        },
    }
    }}
    
    
/>)
}

export default CustomTextField;