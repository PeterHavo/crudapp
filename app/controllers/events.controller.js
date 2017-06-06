module.exports = {
    showEvents: (req, res)=> {
// create dummy data 

  const events = [
  { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' },
  { name: 'Swimming', slug: 'swimming', description: 'Michael Phelps is the fast fish.' },
  { name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up' }
];
// return view with data

    res.render('pages/events', {events: events});
},

    showEvent:(req, res)=>{
        const event =  { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };
        res.render('pages/event.ejs',{event: event});
    }
};