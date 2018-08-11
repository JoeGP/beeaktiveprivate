const e = React.createElement;

// const login  = (e)=>{
//     e.preventDeafault();
//     console.log('tried to login')
// };

export const Login = props =>{
    
    return e('form',{className: 'col-md-4 offset-md-4 form', onSubmit: props.login},[
        e('input', {className: 'form-control',
            placeholder: 'email',
            type: 'email',
            key: 'email',
            id: 'email'
        }),
        e('br',{key: 'br1'}),
        e('input',{
            type: 'password',
            placeholder: 'password',
            key: 'password',
            className: 'form-control',
            id: 'password'
        }),
        e('br',{key: 'br2'}),
        e('button',{
            className: 'btn btn-outline-primary btn-block',
            type: 'submit',
            key: 'button'
        },'Login')
    ] )
}

