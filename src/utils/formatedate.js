export   const formatDate = (isoString) => {
    const date = new Date(isoString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const days = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
     return  {
        day: isoString?`${dayOfWeek}`:'',
        formate_date: isoString?`${days}-${month}-${year}`:''
       }
   
  };
