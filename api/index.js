import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


// import createToken from './middleware/authAPI.js';
// import { createToken } from 
import { createToken } from './middleware/authAPI.js';
import {verifyToken} from './middleware/decoderToken.js';

import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath( import.meta.url );

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));


// Definir o middleware express.static para servir arquivos estáticos
app.use(express.static(path.join(path.resolve(), 'public')));

// Rota raiz da API
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'index.html'));
});

// Gera um token que será usado no header das requisições
app.post('/auth', createToken);

// Rota usada para enviar o e-mail
app.post('/send', verifyToken, (req, res) => {
    const {
        name,
        email,
        phone,
        message,
        subject
    } = req.body;

    console.log("Mostrando o body da solicitação: ", req.body)

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send('Body da solicitação inválido!');
    }

    const user = process.env.USER;
    const pass = process.env.PASS;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
           user:user,
           pass:pass
        }
    });



    const htmlMessage = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="pt" style="font-family:'Exo 2', sans-serif"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Novo modelo 2</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml>
    <![endif]--> <!--[if !mso]><!-- --><link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> <!--<![endif]--><style type="text/css">.rollover span { font-size:0;}.rollover:hover .rollover-first { max-height:0px!important; display:none!important;}.rollover:hover .rollover-second { max-height:none!important; display:block!important;}.container-hover:hover>table { background:linear-gradient(153.06deg, #7EE8FA -0.31%, #EEC0C6 99.69%)!important; transition:0.3s all!important;}.es-menu.es-table-not-adapt td a:hover,a.es-button:hover { text-decoration:underline!important;} #outlook a { padding:0;}.es-button { mso-style-priority:100!important; text-decoration:none!important;}
    a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important;}.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:28px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left }
     .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important }
     .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important }
     tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important }
     .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important }
     .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .m-c-p16r { padding-right:8vw } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }</style>
     </head> <body style="width:100%;font-family:'Exo 2', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div dir="ltr" class="es-wrapper-color" lang="pt" style="background-color:#EFEFEF"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#efefef"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center top;background-color:#EFEFEF" role="none"><tr>
    <td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr><td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0"><table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:620px" role="none"><tr><td align="left" style="padding:0;Margin:0;padding-top:30px;padding-left:40px;padding-right:40px"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:540px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-mobile-hidden"><td align="center" height="15" style="padding:0;Margin:0"></td> </tr></table></td></tr></table></td></tr> <tr><td class="es-m-p20" align="left" bgcolor="#ffffff" style="Margin:0;padding-top:30px;padding-bottom:40px;padding-left:40px;padding-right:40px;background-color:#ffffff;border-radius:20px 20px 0px 0px"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="left" style="padding:0;Margin:0;width:540px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;font-size:0px" height="32"><a target="_blank" href="https://payupbrasil.com.br/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#391484;font-size:18px"><img class="adapt-img" src="https://jfqtqn.stripocdn.email/content/guids/CABINET_6a021c574f1efcff35d82cd4e8e97add7c83cdb7f63770c732e8c3b2ff9f6c97/images/logo_sem_fundo.png" alt="payupbrasil.com.br" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="payupbrasil.com.br" width="166" height="80"></a> </td></tr><tr>
    <td align="left" style="padding:0;Margin:0;padding-top:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#666666;font-size:16px"><b>Olá!</b></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:27px;color:#666666;font-size:18px"><br></p>
     <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:27px;color:#666666;font-size:18px">Você recebeu um novo contato pelo site <strong>payupbrasil.com.br</strong>&nbsp;e os dados do cliente são:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:23px;color:#666666;font-size:15px"><br></p>
     <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#666666;font-size:16px"><strong>Nome: ${name}&nbsp;<br>E-mail: ${email}<br>Telefone: ${phone}<br>Mensagem: ${message}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:18px;color:#666666;font-size:12px"><br></p>
     <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:18px;color:#666666;font-size:12px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:23px;color:#666666;font-size:15px">Por favor, entre em contato com o cliente utilizando os dados acima.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:27px;color:#666666;font-size:18px"><br></p></td></tr></table> </td></tr>
    </table></td></tr> <tr><td align="left" bgcolor="#ffffff" style="padding:35px;Margin:0;background-color:#ffffff"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:550px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="left" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://payupbrasil.com.br/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#391484;font-size:18px"><img class="adapt-img" src="https://jfqtqn.stripocdn.email/content/guids/CABINET_6a021c574f1efcff35d82cd4e8e97add7c83cdb7f63770c732e8c3b2ff9f6c97/images/logo_sem_fundo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100" height="48"></a> </td></tr></table></td></tr></table></td></tr> <tr><td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:5px;padding-bottom:20px;padding-right:20px;padding-left:30px;background-color:#ffffff"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:570px"><table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff" role="presentation"><tr><td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:27px;color:#666666;font-size:18px">📞 <span style="font-size:16px">(11) 3044-0575</span></p></td> </tr><tr>
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:27px;color:#666666;font-size:18px">📨 <span style="font-size:16px">contato@payupbrasil.com.br</span></p></td></tr></table></td></tr></table></td></tr> <tr><td align="left" style="padding:0;Margin:0;padding-top:30px;padding-left:40px;padding-right:40px"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:540px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-mobile-hidden">
    <td align="center" height="15" style="padding:0;Margin:0"></td></tr></table></td></tr></table></td></tr></table></td></tr></table> <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0"><table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:620px" role="none"><tr>
    <td align="left" bgcolor="#ffffff" style="padding:40px;Margin:0;background-color:#ffffff;border-radius:20px"><table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td class="es-m-p40b" align="center" valign="top" style="padding:0;Margin:0;width:540px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="center" class="es-m-p35r es-m-txt-c" style="padding:0;Margin:0;font-size:0px" height="30"><a target="_blank" href="https://payupbrasil.com.br/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#391484;font-size:16px"><img src="https://jfqtqn.stripocdn.email/content/guids/CABINET_6a021c574f1efcff35d82cd4e8e97add7c83cdb7f63770c732e8c3b2ff9f6c97/images/logo_sem_fundo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="128" height="62"></a> </td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
 `

    transporter.sendMail({
            from: "PayUP Brasil",
            to: "fabiana.souza@payupbrasil.com.br",
            replyTo: email,
            subject: subject,
            html: ` ${htmlMessage}`
        })
        .then(info => {
            res.send(info);
        })
        .catch(error => {
            res.send(error);
        });
});


// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});