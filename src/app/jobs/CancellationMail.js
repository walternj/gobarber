import { format, parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('the queue was ran');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment cancellation',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd-MMMM 'at' H:mm", {
          locale: fr,
        }),
      },
    });
  }
}

export default new CancellationMail();
