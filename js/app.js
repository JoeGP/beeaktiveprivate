import {Login} from './login.js';
import {Header} from './header.js';

const e = React.createElement

const MyDiv = props =>{
    return e('div',null, 'Awesome')
}

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    login(e){
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        e.target.email.value = '';
        e.target.password.value = '';

        console.log(user)
        //alert(user.email)
    }

    render(){
       return  e('div',{className: 'body'},[
            e(Header,{key: 'header'}),
            e(Login,{key: 'login', 
                title: 'Please Login Here',
                login: this.login
            })

       ]);
    }
}

ReactDOM.render(
    e(App) , document.getElementById('app')
)