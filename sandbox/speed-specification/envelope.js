/* Copyright 2017 Ladybug Tools authors. MIT License */

	function initEnvelopeInputFields() {

		inpWwr.min = 1;
		inpWwr.max = 100;
		inpWwr.value = 40;

		inpOverhangDepth.min = 0;
		inpOverhangDepth.max = 10;
		inpOverhangDepth.value = 0;
		inpOverhangDepth.step = 0.5;

		inpFinDepth.min = 0;
		inpFinDepth.max = 10;
		inpFinDepth.value = 0;
		inpFinDepth.step = 0.5;

		selWindowType.innerHTML =
			'<option>Window Type 1</option>' +
			'<option>Window Type 2</option>' +
			'<option>Window Type 3</option>' +
		'';

		updateOpenings();

	}


	function updateOpenings() {

		theBuilding.wwr = parseInt( inpWwr.value, 10 );
		theBuilding.overhangDepth = parseFloat( inpOverhangDepth.value );
		theBuilding.finDepth = parseFloat( inpFinDepth.value );
		theBuilding.windowType = selWindowType.value;

//console.log( 'theBuilding', theBuilding );

		if ( theBuilding.shape ) { updateShape(); }

	}
