import { TouchableOpacity } from 'react-native';
import styles from "./CapsuleButtonStyles"

const CapsuleButton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.style, {backgroundColor: props.color}]} onPress={props.onPress}>
        {props.children}
    </TouchableOpacity>
  )
}
export default CapsuleButton;
