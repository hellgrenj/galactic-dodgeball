<script>
  import { onMount } from "svelte";
  export let report;

  onMount(async () => {
    const res = await fetch("/api/neo");
    const newReport = await res.json();
    report = newReport;
  });
</script>


<style>
.report-text {
   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
.quote {
   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.92em;
  font-style: italic
}

</style>

<main>
  <div class="container">
    <div class="row header">
      <div class="col m10 s12">
        <h2>Near Earth Objects report for {report ? report.today : 'today'}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col m10 s12 report-text">
        {@html report ? report.text : 'Loading report...'}
      </div>
    </div>

    <div class="row">
      <div class="col m10 s12">
        <p class="quote">
          Remember, we are all just ants stuck on a rock hurtling through space
          at nearly 1700 km/hr... So relax and be nice! =)
        </p>
      </div>
    </div>
  </div>
</main>
