// ===== ENHANCED COUNTDOWN TIMER =====
function updateCountdown() {
  // UBAH TANGGAL INI → ke 2024 atau 2025
  const weddingDate = new Date("2025-03-30T10:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    // Event completed - elegant message
    document.getElementById("countdown").innerHTML = `
            <div class="event-completed">
                <h3>🎉 Acara Telah Berlangsung!</h3>
                <p>Terima kasih atas doa dan restunya</p>
            </div>
        `;
    return;
  }

  // Countdown logic akan jalan jika tanggal di atas adalah future date
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // Pulsing animation untuk seconds
  if (seconds % 2 === 0) {
    document.getElementById("seconds").style.opacity = "0.9";
  } else {
    document.getElementById("seconds").style.opacity = "1";
  }
}
