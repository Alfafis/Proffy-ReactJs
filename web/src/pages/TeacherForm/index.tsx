import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


function TeacherForm() {

   const history = useHistory();

   const [name, setName] = useState('');
   const [avatar, setAvatar] = useState('');
   const [whatsapp, setWhatsapp] = useState('');
   const [bio, setBio] = useState('');

   const [subject, setSubject] = useState('');
   const [cost, setCost] = useState('');

   const [scheduleItems, SetScheduleItems] = useState([
      { week_day: 0, from: '', to: '' }
   ]);

   function addNewScheduleItem() {
      SetScheduleItems([
         ...scheduleItems,
         { week_day: 0, from: '', to: '' }
      ]);
   }

   function SetScheduleItemValue(position: number, field: string, value: string) {
      const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
         if (index === position) {
            return { ...scheduleItem, [field]: value };
         }
         return scheduleItem;
      });
      SetScheduleItems(updateScheduleItems);
   }

   function handleCreateClass(e: FormEvent) {
      e.preventDefault();

      api.post('classes', {
         name,
         avatar,
         whatsapp,
         bio,
         subject,
         cost: Number(cost),
         schedule: scheduleItems
      }).then(() => {
         alert('Cadastro realizado com sucesso!');
         history.push('/');
      }).catch(() => {
         alert('Erro no cadastro!');
      });
   }

   return (
      <div id="page-teacher-form" className="container">
         <PageHeader
            title="Que incrível que você quer dar aulas"
            description="o primeiro passo é preencher esse formulário de inscrição"
         />
         <main>
            <form onSubmit={handleCreateClass}>
               <fieldset>
                  <legend>Seus Dados</legend>
                  <Input
                     name="name"
                     label="Nome completo"
                     value={name}
                     onChange={(e) => { setName(e.target.value) }}
                  />
                  <Input
                     name="avatar"
                     label="Avatar"
                     value={avatar}
                     onChange={(e) => { setAvatar(e.target.value) }}
                  />
                  <Input
                     name="whatsapp"
                     label="whatsapp"
                     value={whatsapp}
                     onChange={(e) => { setWhatsapp(e.target.value) }}
                  />
                  <Textarea
                     name="bio"
                     label="Biografia"
                     value={bio}
                     onChange={(e) => { setBio(e.target.value) }}
                  />
               </fieldset>

               <fieldset>

                  <legend>Sobre a Aula</legend>
                  <Select
                     name="subject"
                     label="Matéria"
                     value={subject}
                     onChange={(e) => { setSubject(e.target.value) }}
                     options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Matematica', label: 'Matematica' },
                        { value: 'Portugues', label: 'Portugues' },
                        { value: 'Geografia', label: 'Geografia' }
                     ]}
                  />
                  <Input
                     name="cost"
                     label="Custo da sua hora por aula"
                     value={cost}
                     onChange={(e) => { setCost(e.target.value) }}
                  />
               </fieldset>
               <fieldset>
                  <legend>Horarios disponiveis
               <button type="button" onClick={addNewScheduleItem}>
                        + Novo horário
                  </button>
                  </legend>
                  {scheduleItems.map((scheduleItem, index) => {
                     return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                           <Select
                              name="week_day"
                              label="Dia da semana"
                              value={scheduleItem.week_day}
                              onChange={e => SetScheduleItemValue(index, 'week_day', e.target.value)}
                              options={[
                                 { value: '0', label: 'Domingo' },
                                 { value: '1', label: 'Segunda' },
                                 { value: '2', label: 'Terça' },
                                 { value: '3', label: 'Quarta' },
                                 { value: '4', label: 'Quinta' },
                                 { value: '5', label: 'Sexta' },
                                 { value: '6', label: 'Sabado' },
                              ]}
                           />
                           <Input
                              name="from"
                              label="Das"
                              type="time"
                              value={scheduleItem.from}
                              onChange={e => SetScheduleItemValue(index, 'from', e.target.value)}
                           />
                           <Input
                              name="to"
                              label="Até"
                              type="time"
                              value={scheduleItem.to}
                              onChange={e => SetScheduleItemValue(index, 'to', e.target.value)}
                           />
                        </div>
                     )
                  })}
               </fieldset>
               <footer>
                  <p>
                     <img src={warningIcon} alt="Aviso importante" />
                  Importante! <br />
                  Preencha todos os dados
               </p>
                  <button type="submit">
                     Salvar cadastro
               </button>
               </footer>
            </form>
         </main>
      </div>
   )
}

export default TeacherForm;