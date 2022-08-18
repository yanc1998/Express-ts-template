import {Service} from "typedi";
import {createTransport, Transporter} from 'nodemailer'
import {Result} from "../../base/core/ddd-base/core/result";
import {AppError} from "../../base/core/ddd-base/core/errors/app.error";

@Service()
export class EmailService {
    private readonly nodemailerTransport: Transporter

    constructor() {
        this.nodemailerTransport = createTransport({
            service: process.env.EMAILSERVER || 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSEMAIL
            }
        })
    }

    async sendEmail(to: string, data: any, subject: string): Promise<Result<void>> {
        const mailOptions = {
            from: process.env.EMAIL || 'yancarloglez98@gmail.com',
            to: to,
            subject: subject,
            data: data
        }
        try {
            await this.nodemailerTransport.sendMail(mailOptions)
            return Result.Ok()
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }
    }
}
