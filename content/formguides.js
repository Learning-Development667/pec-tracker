// ── FORM GUIDE HTML DEFINITIONS ──
// This file defines the inline form guide HTML for each exercise.
// It is loaded before scripts.js so the FORM_GUIDES object is available.

const FORM_GUIDES = {

  bench: `
    <div class="inline-form-guide" id="ifg-bench">
      <div class="ifg-inner">
        <div class="ifg-steps">
          <div class="ifg-step"><div class="ifg-step-n">1</div><div class="ifg-step-t"><strong>Setup:</strong> Lie flat. Five points of contact — both feet flat on the floor, both glutes on the bench, both shoulder blades pressed back and down into the bench, head resting on the bench.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">2</div><div class="ifg-step-t"><strong>Grip:</strong> Hands just outside shoulder width. Thumb wrapped fully around the bar. Bar sits in the heel of your palm. Wrists straight throughout.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">3</div><div class="ifg-step-t"><strong>Unrack:</strong> Breathe in, brace your core, unrack the bar directly over your chest — not your face or stomach.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">4</div><div class="ifg-step-t"><strong>Lower:</strong> Bring the bar to your lower chest (nipple line). Elbows at 45–60° to the body — not flared wide. 2 seconds down.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">5</div><div class="ifg-step-t"><strong>Press:</strong> Bar touches chest lightly. Exhale and press straight up.</div></div>
          <div class="ifg-caution">Avoid: Bouncing bar off chest · Elbows flared to 90° · Lifting glutes off bench · Wrists bent backward</div>
        </div>
        <div class="ifg-img"><img src="images/bench-press.png" alt="Flat Barbell Bench Press"></div>
      </div>
    </div>`,

  fly: `
    <div class="inline-form-guide" id="ifg-fly">
      <div class="ifg-inner">
        <div class="ifg-steps">
          <div class="ifg-step"><div class="ifg-step-n">1</div><div class="ifg-step-t"><strong>Setup:</strong> Lie flat on bench. Hold a dumbbell in each hand directly above your chest, palms facing each other. Slight bend in elbows throughout — never lock them out.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">2</div><div class="ifg-step-t"><strong>Lower:</strong> Open your arms wide and lower the dumbbells in a wide arc until you feel a stretch across your chest. Elbows stay at the same angle throughout.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">3</div><div class="ifg-step-t"><strong>Return:</strong> Squeeze your chest and bring the dumbbells back together above your chest in the same arc. Do not press — think of hugging a barrel.</div></div>
          <div class="ifg-caution">Avoid: Straightening the elbows fully · Lowering too fast · Letting shoulders shrug up</div>
        </div>
        <div class="ifg-img"><img src="images/chest-fly.png" alt="Dumbbell Chest Fly"></div>
      </div>
    </div>`,

  incline: `
    <div class="inline-form-guide" id="ifg-incline">
      <div class="ifg-inner">
        <div class="ifg-steps">
          <div class="ifg-step"><div class="ifg-step-n">1</div><div class="ifg-step-t"><strong>Setup:</strong> Set bench to 30–45°. Sit back with shoulders pressed into the pad. Hold a dumbbell in each hand at shoulder height, palms facing forward.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">2</div><div class="ifg-step-t"><strong>Press:</strong> Push the dumbbells up and slightly together until arms are extended. Do not bang them together at the top.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">3</div><div class="ifg-step-t"><strong>Lower:</strong> Bring the dumbbells back down slowly to shoulder height. Keep elbows at roughly 45° to the body — not flared out wide.</div></div>
          <div class="ifg-caution">Avoid: Bench angle above 45° (shifts load to shoulders) · Arching lower back off the pad · Rushing the lowering phase</div>
        </div>
        <div class="ifg-img"><img src="images/incline-press.png" alt="Incline Dumbbell Press"></div>
      </div>
    </div>`,

  closegrip: `
    <div class="inline-form-guide" id="ifg-closegrip">
      <div class="ifg-inner">
        <div class="ifg-steps">
          <div class="ifg-step"><div class="ifg-step-n">1</div><div class="ifg-step-t"><strong>Setup:</strong> Lie flat. Grip the bar with hands shoulder-width apart or slightly narrower. Thumbs fully wrapped around the bar.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">2</div><div class="ifg-step-t"><strong>Lower:</strong> Bring the bar down to your lower chest. Keep elbows tucked close to your sides throughout — this is what makes it close-grip.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">3</div><div class="ifg-step-t"><strong>Press:</strong> Drive the bar back up to the start position. Focus on feeling the triceps working alongside the chest.</div></div>
          <div class="ifg-caution">Avoid: Gripping too narrow (puts stress on wrists) · Letting elbows flare out · Using the same weight as your regular bench press</div>
        </div>
        <div class="ifg-img"><img src="images/close-grip.png" alt="Close-Grip Bench Press"></div>
      </div>
    </div>`,

  pullover: `
    <div class="inline-form-guide" id="ifg-pullover">
      <div class="ifg-inner">
        <div class="ifg-steps">
          <div class="ifg-step"><div class="ifg-step-n">1</div><div class="ifg-step-t"><strong>Setup:</strong> Lie flat on the bench. Hold one dumbbell with both hands, palms pressed against the underside of the top plate. Arms extended above your chest.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">2</div><div class="ifg-step-t"><strong>Lower:</strong> With a slight bend in the elbows, lower the dumbbell back over your head in a wide arc until you feel a stretch through your chest and lats.</div></div>
          <div class="ifg-step"><div class="ifg-step-n">3</div><div class="ifg-step-t"><strong>Return:</strong> Pull the dumbbell back over your chest in the same arc. Keep the movement controlled throughout.</div></div>
          <div class="ifg-caution">Avoid: Bending elbows too much (turns it into a tricep exercise) · Going too heavy · Rushing the stretch at the bottom</div>
        </div>
        <div class="ifg-img"><img src="images/pullover.png" alt="Dumbbell Pullover"></div>
      </div>
    </div>`

};
