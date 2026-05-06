// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('navLinks');

    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            // Toggle between hamburger and X icon
            if (nav.classList.contains('open')) {
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            } else {
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
            }
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-triggered fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    var animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .gallery-item, .faq-item, .benefit, .service-item, .book-now-card, .map-card'
    );

    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


// Initialize Leaflet Map
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') return;

    // Charlotte, NC coordinates
    const charlotteCoords = [35.2271, -80.8431];
    
    // Create map
    const map = L.map('map').setView(charlotteCoords, 11);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add service area circle (15 mile radius)
    const serviceRadius = 24.14; // 15 miles in km
    L.circle(charlotteCoords, {
        color: '#d32f2f',
        fillColor: '#d32f2f',
        fillOpacity: 0.15,
        weight: 2,
        radius: serviceRadius * 1000,
        dashArray: '5, 5'
    }).addTo(map);
    
    // Add center marker with custom icon
    const markerIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM4LjI3IDAgMiA2LjI3IDIgMTRjMCA4IDE0IDM0IDE0IDM0czE0LTI2IDE0LTM0YzAtNy43My02LjI3LTE0LTE0LTE0eiIgZmlsbD0iI2QzMmYyZiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTQiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48]
    });
    
    const marker = L.marker(charlotteCoords, { icon: markerIcon }).addTo(map);
    
    // Add popup to marker
    marker.bindPopup(`
        <div style="font-weight: 600; color: #d32f2f; margin-bottom: 4px;">Geoff's Mobile Auto Repair</div>
        <div style="color: #666; font-size: 13px; margin-bottom: 4px;">Charlotte, NC</div>
        <div style="color: #666; font-size: 13px; margin-bottom: 8px;">📞 (704) 236-5670</div>
        <div style="font-size: 12px; color: #999;">We come to you!</div>
    `).openPopup();
    
    // Add service area markers (example locations)
    const serviceLocations = [
        { name: 'Uptown Charlotte', coords: [35.2271, -80.8431] },
        { name: 'South Charlotte', coords: [35.1500, -80.8500] },
        { name: 'North Charlotte', coords: [35.3500, -80.8200] },
        { name: 'East Charlotte', coords: [35.2200, -80.7500] },
        { name: 'West Charlotte', coords: [35.2300, -80.9200] }
    ];
    
    serviceLocations.forEach(location => {
        L.circleMarker(location.coords, {
            radius: 5,
            fillColor: '#d32f2f',
            color: '#fff',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.8
        }).addTo(map).bindPopup(`<strong>${location.name}</strong><br>Service Area`);
    });
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <div style="background: white; padding: 12px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-size: 12px; font-family: inherit;">
                <div style="margin-bottom: 8px; font-weight: 600;"><strong>Service Area</strong></div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <div style="width: 12px; height: 12px; background: #d32f2f; border-radius: 50%;"></div>
                    <span>Service Locations</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 20px; height: 2px; background: #d32f2f; border-top: 2px dashed #d32f2f;"></div>
                    <span>15 Mile Radius</span>
                </div>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}
