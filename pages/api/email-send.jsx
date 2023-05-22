import axios from "axios";
import nodemailer from "nodemailer";
export default async function handler(req, res) {
  const pedido = req.body.pedido;
  const templateEmailCliente = (pedido) => {
    const produtos = pedido.carrinho_produtos;
    const cssAndHead = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      style="
        width: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        padding: 0;
        margin: 0;
      "
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>New Template 3</title>
        <!--[if (mso 16)
          ]><style type="text/css">
            a {
              text-decoration: none;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9
          ]><style>
            sup {
              font-size: 100% !important;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9
          ]><xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml><!
        [endif]-->
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150% !important;
            }
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
              line-height: 120% !important;
            }
            h1 {
              font-size: 30px !important;
              text-align: center;
            }
            h2 {
              font-size: 22px !important;
              text-align: center;
            }
            h3 {
              font-size: 20px !important;
              text-align: center;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 30px !important;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 22px !important;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
            }
            .es-menu td a {
              font-size: 18px !important;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 14px !important;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 16px !important;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 14px !important;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px !important;
            }
            *[class="gmail-fix"] {
              display: none !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-button-border {
              display: inline-block !important;
            }
            a.es-button,
            button.es-button {
              font-size: 16px !important;
              display: inline-block !important;
            }
            .es-btn-fw {
              border-width: 10px 0px !important;
              text-align: center !important;
            }
            .es-adaptive table,
            .es-btn-fw,
            .es-btn-fw-brdr,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .es-adapt-td {
              display: block !important;
              width: 100% !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-m-p0 {
              padding: 0px !important;
            }
            .es-m-p0r {
              padding-right: 0px !important;
            }
            .es-m-p0l {
              padding-left: 0px !important;
            }
            .es-m-p0t {
              padding-top: 0px !important;
            }
            .es-m-p0b {
              padding-bottom: 0 !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            table.es-social {
              display: inline-block !important;
            }
            table.es-social td {
              display: inline-block !important;
            }
            .es-desk-hidden {
              display: table-row !important;
              width: auto !important;
              overflow: visible !important;
              max-height: inherit !important;
            }
            .h-auto {
              height: auto !important;
            }
          }
        </style>
      </head>`;
    const products = () => {
      return produtos.map((value) => {
        return ` <tr style="border-bottom: 2px solid #22a4dd">
        <td
          align="left"
          style="
            margin: 0;
            padding-bottom: 15px;
            padding-top: 20px;
            padding-left: 20px;
            padding-right: 20px;
          "
        >
          <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
          <table
            class="es-left"
            cellspacing="0"
            cellpadding="0"
            align="left"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: left;
            "
          >
            <tr style="border-collapse: collapse">
              <td
                align="left"
                style="padding: 0; margin: 0; width: 270px"
              >
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr style="border-collapse: collapse">
                    <td
                      align="center"
                      style="
                        padding: 0;
                        margin: 0;
                        font-size: 0px;
                      "
                    >
                      <a
                        target="_blank"
                        href="#"
                        style="
                          -webkit-text-size-adjust: none;
                          -ms-text-size-adjust: none;
                          mso-line-height-rule: exactly;
                          text-decoration: none;
                          color: #f1c232;
                          font-size: 16px;
                        "
                        ><img
                          class="adapt-img"
                          src="https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/${value.product.product_images[0].src}"
                          alt
                          style="
                            display: block;
                            border: 0;
                            outline: none;
                            text-decoration: none;
                            -ms-interpolation-mode: bicubic;
                          "
                          width="159"
                      /></a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
          <table
            class="es-right"
            cellspacing="0"
            cellpadding="0"
            align="right"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              float: right;
            "
          >
            <tr style="border-collapse: collapse">
              <td
                class="es-m-p20b"
                align="left"
                style="padding: 0; margin: 0; width: 270px"
              >
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                  "
                >
                  <tr style="border-collapse: collapse">
                    <td
                      align="left"
                      style="
                        padding: 0;
                        margin: 0;
                        padding-top: 5px;
                      "
                    >
                      <h1
                        style="
                          margin: 0;
                          line-height: 18px;
                          mso-line-height-rule: exactly;
                          font-family: 'trebuchet ms',
                            'lucida grande', 'lucida sans unicode',
                            'lucida sans', tahoma, sans-serif;
                          font-size: 15px;
                          font-style: normal;
                          font-weight: normal;
                          color: #333333;
                        "
                      >
                        <strong
                          >${value.product.name}</strong
                        >
                      </h1>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse">
                    <td
                      class="es-m-txt-c"
                      align="left"
                      style="
                        padding: 0;
                        margin: 0;
                        padding-top: 10px;
                        padding-bottom: 10px;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          -webkit-text-size-adjust: none;
                          -ms-text-size-adjust: none;
                          mso-line-height-rule: exactly;
                          font-family: helvetica, 'helvetica neue',
                            arial, verdana, sans-serif;
                          line-height: 30px;
                          color: #333333;
                          font-size: 20px;
                        "
                      >
                        <strong>R$ ${value.preco}</strong>
                      </p>
                    </td>
                  </tr>
                  <tr style="border-collapse: collapse">
                    <td style="padding: 0; margin: 0">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                        "
                      >
                        <tr style="border-collapse: collapse">
                          <td
                            align="center"
                            style="
                              padding: 0;
                              margin: 0;
                              display: none;
                            "
                          ></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>`;
      });
    };
    return `
    ${cssAndHead}
  
    <body
    style="
      width: 100%;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #f6f6f6">
      <!--[if gte mso 9
        ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background
      ><![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #f6f6f6;
        "
      >
        <tr style="border-collapse: collapse">
          <td valign="top" style="padding: 0; margin: 0">
            
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr style="border-collapse: collapse">
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-content-body"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                    align="center"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr style="border-collapse: collapse">
                      <td align="left" style="padding: 0; margin: 0">
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr style="border-collapse: collapse">
                            <td
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 600px"
                            >
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr style="border-collapse: collapse">
                                  <td
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      position: relative;
                                    "
                                    align="center"
                                  >
                                    <a
                                      target="_blank"
                                      href="#"
                                      style="
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        text-decoration: none;
                                        color: #f1c232;
                                        font-size: 16px;
                                      "
                                      ><img
                                        class="adapt-img"
                                        src="https://facilitoy.com.br/EMAIL_BANNER.jpg"
                                        alt="Pedido Confirmado!"
                                        title="Pedido Confirmado!"
                                        width="100%"
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                    /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              class="es-content"
              cellspacing="0"
              cellpadding="0"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr style="border-collapse: collapse">
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-content-body"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                    align="center"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr style="border-collapse: collapse">
                      <td
                        align="left"
                        style="padding: 0; margin: 0; padding-top: 10px"
                      >
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr style="border-collapse: collapse">
                            <td
                              valign="top"
                              align="center"
                              style="padding: 0; margin: 0; width: 600px"
                            >
                              <table
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  border-bottom: 2px solid #22a4dd;
                                "
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                role="presentation"
                              >
                                <tr style="border-collapse: collapse">
                                  <td
                                    class="es-m-txt-c"
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <h2
                                      style="
                                        margin: 0;
                                        line-height: 19px;
                                        mso-line-height-rule: exactly;
                                        font-family: 'trebuchet ms',
                                          'lucida grande', 'lucida sans unicode',
                                          'lucida sans', tahoma, sans-serif;
                                        font-size: 16px;
                                        font-style: normal;
                                        font-weight: normal;
                                        color: #22a4dd;
                                      "
                                    >
                                      Númedo do Pedido #${pedido.id}
                                    </h2>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ${products()}
                  </table>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

    `;
  };
  const templateEmailFranquiado = (pedido) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template 2</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
@media only screen and (max-width:600px) {p, ul li, ol li { margin-bottom:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li { margin-bottom:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li { margin-bottom:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li { margin-bottom:12px!important } p, ul li, ol li, a { line-height:200%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left; margin-bottom:22px } h2 { font-size:26px!important; text-align:left; margin-bottom:16px } h3 { font-size:20px!important; text-align:left; margin-bottom:12px } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .h-auto { height:auto!important } }
</style>
 </head>
 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#EEEDED"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eeeded"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#EEEDED">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       
       <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px;font-size:0px"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://facilitoy.com.br/logo.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="190" title="Logo"></a></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#d72c3c;margin-bottom:28px">Novo Pedido!</h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:5px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:590px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:10px;Margin:0"><h2 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333;margin-bottom:16px">Código&nbsp;<a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#00D0D9;font-size:18px;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif" href="">#${pedido.id}</a></h2></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:15px;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#d72c3c;margin-bottom:16px">Confira as informações abaixo.</h2></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:2px solid #efefef;border-bottom:2px solid #efefef">
                     <tr>
                      <td align="center" class="h-auto" valign="middle" height="73" style="padding:0;Margin:0"><!--[if mso]><a href="https://facilitoy.com.br/adm/pedidos/${pedido.id}" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
                style="height:63px; v-text-anchor:middle; width:290px" arcsize="29%" stroke="f"  fillcolor="#00d0d9">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:"comic sans ms", "marker felt-thin", arial, sans-serif; font-size:27px; font-weight:400; line-height:27px;  mso-text-raise:1px'>Ver pedido</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#00d0d9;border-width:0px;display:inline-block;border-radius:18px;width:auto;mso-hide:all"><a href="https://facilitoy.com.br/adm/pedidos/${pedido.id}" class="es-button es-button-1684547914900" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:28px;padding:15px 65px;display:inline-block;background:#00d0d9;border-radius:18px;font-family:'comic sans ms', 'marker felt-thin', arial, sans-serif;font-weight:normal;font-style:normal;line-height:34px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #5C68E2">Ver pedido</a></span><!--<![endif]--></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
    `;
  };
  const transporter = nodemailer.createTransport({
    host: "mail.facilitoy.com.br",
    port: 465,
    secure: true,
    auth: {
      user: "suporte@facilitoy.com.br",
      pass: "facilitoy2023",
    },
  });

  const cliente = await transporter.sendMail({
    from: { name: "Facilitoy", address: "suporte@facilitoy.com.br" },
    to: pedido.user.email,
    subject: "Seu pedido foi confirmado!",
    text: "Veja os itens do pedido",

    html: templateEmailCliente(pedido),
  });
  const franquiado = await transporter.sendMail({
    from: { name: "Facilitoy", address: "suporte@facilitoy.com.br" },
    to: pedido.franquium.user.email,
    subject: "Novo pedido recebido!",
    text: "Veja os dados do pedido",

    html: templateEmailFranquiado(pedido),
  });

  res.status(200).json("emails.data");
}
