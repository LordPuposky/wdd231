// Footer last modification date
        document.getElementById('lastmod').textContent = document.lastModified;

        // Member directory logic with big, horizontal logos
        const membersContainer = document.getElementById('members-container');
        const gridBtn = document.getElementById('grid-view-btn');
        const listBtn = document.getElementById('list-view-btn');
        let membersData = [];
        let currentView = 'grid';

        async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Network response was not ok');
            membersData = await response.json();
            displayMembers(currentView);
        } catch (error) {
            membersContainer.innerHTML = '<p>Error loading members data.</p>';
            console.error('Error fetching members:', error);
        }
        }

        function displayMembers(view) {
        if (view === 'grid') {
            // Horizontal alignment, big logo, company info right
            membersContainer.innerHTML = `
            <div class="members-grid">
                ${membersData.map(member => `
                <div class="member-card" style="display:flex;align-items:center;gap:1.7rem;padding:1.5rem 1rem;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(214,0,53,0.09);margin-bottom: 1.4rem;">
                    <img src="${member.logo}"
                        alt="${member.name} logo"
                        style="height:90px;max-width:130px;min-width:80px;object-fit:contain;flex-shrink:0;margin-right:1rem;">
                    <div style="flex:1;">
                    <h3 style="margin:0 0 0.6rem 0;color:#D60035;">${member.name}</h3>
                    <p style="margin:0 0 0.4rem 0;">${member.address}</p>
                    <p style="margin:0 0 0.4rem 0;">${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <span class="membership-level">Gold</span>
>
                    </div>
                </div>
                `).join('')}
            </div>
            `;
        } else {
            // Table list view
            membersContainer.innerHTML = `
            <table class="members-list">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Membership</th>
                </tr>
                </thead>
                <tbody>
                ${membersData.map((member, i) => `
                    <tr class="${i % 2 === 0 ? 'even' : 'odd'}">
                    <td>${member.name}</td>
                    <td>${member.address}</td>
                    <td>${member.phone}</td>
                    <td><a href="${member.website}" target="_blank">${member.website}</a></td>
                    <td>${member.membership_level}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
            `;
        }
        }

        gridBtn.addEventListener('click', () => {
        currentView = 'grid';
        displayMembers(currentView);
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        });

        listBtn.addEventListener('click', () => {
        currentView = 'list';
        displayMembers(currentView);
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        });

        fetchMembers();