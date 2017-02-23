export default {
   addMember: (name, role, email, members) => {
      const errorState = {
         stage: 'team',
         error: 'What\'s their name?',
         members,
         teamName: name,
         teamRole: role,
         teamEmail: email
      }
      if (name.length === 0) {
         const element = document.getElementById('teamName')
         element.focus()
         return errorState
      }
      if (email.length === 0) {
         const element = document.getElementById('teamEmail')
         errorState.error = 'What\'s their email?'
         element.focus()
         return errorState
      }

      const newMember = {
         name,
         role,
         email
      }
      members.push(newMember)
      const element = document.getElementById('teamName')
      element.focus()
      const newState = {
         stage: 'team',
         error: '',
         members,
         teamName: '',
         teamRole: '',
         teamEmail: ''
      }
      return newState
   }
}
