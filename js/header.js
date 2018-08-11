const e =  React.createElement;

export const Header = props =>{
    return e('div',{className: 'col-md-4 offset-md-8 jumbotron'},[
        e('h3',{className: 'text-danger', key: 'header3'}, 
            'BeeAktive Office Management'),
        e('p', {key: 'paragraph'}, `
            Deligence + Productivity + Excellence = Promotion.
            The bonus is Monthly Best Worker!
        `)
    ])
}