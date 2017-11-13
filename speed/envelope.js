/* Copyright 2017 Ladybug Tools authors. MIT License */

	function initEnvelopeInputFields() {

		if (WWRByFacade == true)
		{
			document.getElementById("divEnvelope").innerHTML =
			'<h2> Envelope by Building </h2>\n'+
			'<p><button onclick=changeWWR(WWRByFacade);>Toogle to WWRByBuilding</button></p>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>building wwr %</td><td>number of Windows</td><td>Overhang Depth</td><td>Fin Depth</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><input type=number id=inpWwr onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindows onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepth onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepth onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
			'</table>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>window Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowType onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
			'</table>';

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

			inpWwr.min = 1;
			inpWwr.max = 10;
			inpWwr.value = 3;

			noWindows.min = 1;
			noWindows.max = 10;
			noWindows.value = 3;

			selWindowType.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';
		}
		else
		{
			document.getElementById("divEnvelope").innerHTML =
			'<h2> Envelope by Facade </h2>\n'+
			'<p><button onclick=changeWWR(); >Toogle to WWRByFacade</button></p>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>building wwr South %</td><td>number of Windows</td><td>Overhang South Depth</td><td>Fin South Depth</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><input type=number id=inpWwrS onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsS onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthS onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthS onchange=updateOpenings(); ></td>\n'+
				'<tr>\n'+
					'<td>building wwr North %</td><td>number of Windows</td><td>Overhang North Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrN onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsN onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthN onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthN onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>building wwr East %</td><td>number of Windows</td><td>Overhang East Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrE onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsE onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthE onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthE onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>building wwr West %</td><td>number of Windows</td><td>Overhang West Depth</td><td>Fin North Depth</td>\n'+
				'</tr>\n'+
					'<td><input type=number id=inpWwrW onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=noWindowsW onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpOverhangDepthW onchange=updateOpenings(); ></td>\n'+
					'<td><input type=number id=inpFinDepthW onchange=updateOpenings(); ></td>\n'+
				'</tr>\n'+
			'</table>\n'+
			'<table>\n'+
				'<tr>\n'+
					'<td>windows South Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeS onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows North Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeN onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows East Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeE onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td>windows West Construction Type</td>\n'+
				'</tr>\n'+
				'<tr>\n'+
					'<td><select id=selWindowTypeW onchange=updateConstructions();></select></td>\n'+
				'</tr>\n'+
			'</table>';

			inpWwrS.min = 1;
			inpWwrS.max = 100;
			inpWwrS.value = 40;

			inpWwrN.min = 1;
			inpWwrN.max = 100;
			inpWwrN.value = 40;

			inpWwrE.min = 1;
			inpWwrE.max = 100;
			inpWwrE.value = 40;

			inpWwrW.min = 1;
			inpWwrW.max = 100;
			inpWwrW.value = 40;

			noWindowsW.min = 1;
			noWindowsW.max = 10;
			noWindowsW.value = 3;

			inpWwrE.min = 1;
			inpWwrE.max = 10;
			inpWwrE.value = 3;

			noWindowsE.min = 1;
			noWindowsE.max = 10;
			noWindowsE.value = 3;

			inpWwrN.min = 1;
			inpWwrN.max = 10;
			inpWwrN.value = 3;

			noWindowsN.min = 1;
			noWindowsN.max = 10;
			noWindowsN.value = 3;

			inpWwrS.min = 1;
			inpWwrS.max = 10;
			inpWwrS.value = 3;

			noWindowsS.min = 1;
			noWindowsS.max = 10;
			noWindowsS.value = 3;

			selWindowTypeS.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeN.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeE.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';

			selWindowTypeW.innerHTML =
				'<option>ASHRAE 90.1 climate Zone 8</option>' +
				'<option>ASHRAE 189.1 climate zone 7</option>' +
				'<option>ASHRAE 189.1 climate zone 6</option>' +
			'';
		}
		updateOpenings();
	}

		function changeWWR()
		{
			if (WWRByFacade == false)
			{
				WWRByFacade = true
			}
			else
			{
				WWRByFacade = false
			}

		initEnvelopeInputFields()

		}

		function updateOpenings() {
			changeLengthSlider()
		}

		function updateConstructions()
		{

		}
