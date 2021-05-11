import color from 'colors'
import { clockRunning } from 'react-native-reanimated'
const styles =  {
    TextInput:{
        padding:5,
        height:50,
        borderColor: color.inActive,
        borderWidth:1,
        borderRadius:20,
        marginBottom:20,
        fontSize:20,
        color:color.white,
        paddingHorizontal:20,
        fontFamily:'Montserrat'
    },
    SignUp:{
        alignSelf:'center',
        opacity:0.7,
        fontSize:16
    },
    heading:{
        position:'absolute',
        top:150,
        fontSize:35,
        alignSelf:'center',
        marginBottom:20,
        textTransform:'uppercase',
        fontWeight:'600',
        letterSpacing:2,
        opacity:0.75
    },
    SubmitButton:{
        height:50,
        backgroundColor:color.active,
        color:color.white,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    },
    Container:{
        flex:1,
        padding:20,
        backgroundColor: color.dark
    },
    Form:{
        position:'absolute',
        top:250,
        width:'100%',
        alignSelf:'center'
    }
}

export default styles

