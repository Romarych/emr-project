import phone from '../../static/images/phone.png'
import address from '../../static/images/address.png'
import email from '../../static/images/email.png'
import medical from '../../static/images/medical.png'
import instagram from '../../static/images/instagram.png'
import facebook from '../../static/images/facebook.png'
import recomendations from '../../static/images/recomendations.png'
import notifications from '../../static/images/notifications.png'
import comments from '../../static/images/comments.png'

export const listInfo = [
    {
        name: 'Phone',
        icon: phone,
        type: 'text'
    },
    {
        name: 'Address',
        icon: address,
        type: 'text'
    },
    {
        name: 'E-mail',
        icon: email,
        type: 'email'
    },
    {
        name: 'Medical Insurance',
        icon: medical,
        type: 'text'
    },
    {
        name: 'Instagram',
        icon: instagram,
        type: 'url'
    },
    {
        name: 'Facebook',
        icon: facebook,
        type: 'url'
    },
    {
        name: 'Recomendations',
        icon: recomendations,
        type: 'text'
    },
    {
        name: 'Social Marketing & Notifications',
        icon: notifications,
        type: 'checkbox',
    },
    {
        name: 'Comments',
        icon: comments,
        type: 'textarea',
    },
];