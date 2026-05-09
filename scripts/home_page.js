
 
    document.getElementById('modDate').textContent = document.lastModified;

   
    const courses = document.querySelectorAll('.course-item');
    const buttons = document.querySelectorAll('.filter-btn');
    const creditsNote = document.getElementById('creditsNote');

    const creditMap = { 'WDD 130': 2, 'WDD 131': 2, 'WDD 231': 2, 'CSE 110': 2, 'CSE 111': 2, 'CSE 210': 2 };

    function updateCredits(filter) {
      let total = 0;
      courses.forEach(c => {
        const visible = filter === 'all' || c.dataset.cat === filter;
        c.classList.toggle('hidden', !visible);
        if (visible) total += (creditMap[c.textContent.trim()] || 2);
      });
      creditsNote.textContent = `The total credits for course listed above is ${total}`;
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCredits(btn.dataset.filter);
      });
    });

   
    updateCredits('all');
