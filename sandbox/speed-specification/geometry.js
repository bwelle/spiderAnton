/* Copyright 2017 Ladybug Tools authors. MIT License */

// split into multiple files
// needs clean up

	let theBuilding;

	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var pi = Math.PI;
	const d2r = pi / 180, r2d = 180 /pi;

	var buildingArea,numFloors

	var length,width

	var widthMin,widthMax

	var lengthMin,lengthMax

	var thickness

	var calculatedFloorArea

	const buildingShapes =
{
	"Lshape":0,
	"Hshape":1,
	"Tshape":2,
	"Boxshape":3
};

const userChange =
{
	"buildingArea":0,
	"numFloors":1,
	"lengthChange":2,
	"widthChange":3,
	"buildingShape":4,
	"perimeterDepth":5,
	"irrevelent":6
};



	/// Helper functions

	function stringOfBuildingShapeToBuildingShapeEnum(selectedShapeType){

		if (selectedShapeType === "L-Shape")
		{
			return buildingShapes.Lshape
		}
		else if (selectedShapeType === "H-Shape")
		{
			return buildingShapes.Hshape
		}
		else if (selectedShapeType === "T-Shape")
		{
			return buildingShapes.Tshape
		}
		else if (selectedShapeType === "Box-Shape")
		{
			return buildingShapes.Boxshape
		}
		else {
			throw new Error('Cannot convert string '+selectedShapeType+ ' to building shape enum!!')
		}
	}


	// End of Helper functions

	function changeBuildingShape(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{

		// Strangely in slider the values are stored as strings we need to make sure that they are parsed as numbers before used

		implementUserChange(userChange.buildingShape,buildingShape)

	}

	function changeNumFloors(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{
		implementUserChange(userChange.numFloors,buildingShape)
	}

	function changeBuildingArea(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{


		implementUserChange(userChange.buildingArea,buildingShape)
	}

	function changeLengthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{
		implementUserChange(userChange.lengthChange,buildingShape)
	}

	function changeWidthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
	{

		implementUserChange(userChange.widthChange,buildingShape)
	}

	function implementUserChange(typeUserChange,buildingShape)
	{

		// Promise chaining taken from - https://javascript.info/promise-chaining
		new Promise(function(resolve,reject)
		{
		// First do all calculations
		doCalculations(resolve,reject,typeUserChange,buildingShape)
			})
		.then(function(values)
			{

				/// Update text on sliders
				// updateTextInput(values.length,"lengthSlider")
				// updateTextInput(values.width,'widthSlider')
				//Update stored values and slider values

				inpWidth.max = values.widthMax
				widthMax = values.widthMax

				inpWidth.min = values.widthMin
				widthMin = values.widthMin

				inpWidth.value = values.width
				width = values.width

				inpLength.max =  values.lengthMax
				lengthMax = values.lengthMax

				inpLength.min = values.lengthMin
				lengthMin  = values.lengthMin

				inpLength.value = values.length
				length = values.length

				return values
			})
			.then(function(values)
				{
					// Update the shape + display all the values
					updateShape(values)
				}
			)
		}


	function doCalculations(resolve,reject,typeUserChange,buildingShape)
	{ //// General method for doing calculations

		let factorChange

		let lengthLocal,widthLocal
		let localWidthMin,localWidthMax
		let localLengthMin,localLengthMax
		let newfloorArea
		let newNumOfFloors

		function calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)
		{
			switch (buildingShape)
			{
				case buildingShapes.Lshape:

					a = (lengthLocal+widthLocal)/2

					b = Math.sqrt(Math.pow(a,2)-floorArea)

					thickness = a-b

					calculatedFloorArea = (widthLocal*thickness)+((lengthLocal-thickness)*thickness)

					break;

				case buildingShapes.Hshape:

					a = (lengthLocal+2*widthLocal)/4

					b = Math.sqrt(Math.pow(a,2)-floorArea/2)

					thickness = a-b

					/// the thickness of the middle part of the H-shape is equal to thickness
					calculatedFloorArea = (2*widthLocal*thickness)+(thickness*(lengthLocal-2*thickness))

					break;
				case buildingShapes.Tshape:

					a = (lengthLocal+widthLocal)/2

					b = Math.sqrt(Math.pow(a,2)-floorArea)

					thickness = a-b

					calculatedFloorArea = (thickness*lengthLocal)+(thickness*(widthLocal-thickness))

					break;

				case buildingShapes.Boxshape:

					lengthMax = Math.sqrt(floorArea*10);

					lengthMin = Math.sqrt(floorArea/10);

					/// Length min and max????

					widthMax = floorArea/lengthLocal

					widthMin = floorArea/parseFloat(lengthLocal);

					calculatedFloorArea = widthLocal*lengthLocal

					thickness = "NA"

					break;
				default:
					return reject('Building type enum does not exist!');
			}
		}

		function calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)
		{
				switch (buildingShape)
				{
					case buildingShapes.Lshape:

						// create factor change on the length
						/// Length is x
						lengthMax = 2*Math.sqrt(floorArea*1.8);

						lengthMin = 2/3*Math.sqrt(floorArea*1.8);

						/// Width is y
						widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;

					case buildingShapes.Hshape:

						lengthMax = 2*Math.sqrt(floorArea*(9/7));

						lengthMin = 2/3*Math.sqrt(floorArea*(9/7));

						widthMax =  5*(floorArea/parseFloat(lengthLocal))-0.4*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					case buildingShapes.Tshape:

						lengthMax = 2*Math.sqrt(floorArea*1.8);

						lengthMin = 2/3*Math.sqrt(floorArea*1.8);

						widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

						widthMin = floorArea/parseFloat(lengthLocal);

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					case buildingShapes.Boxshape:

						lengthMax = Math.sqrt(floorArea*10);

						lengthMin = Math.sqrt(floorArea/10);

						/// Length min and max????

						widthMax = Math.sqrt(floorArea*10);

						widthMin = Math.sqrt(floorArea/10);

						thickness = "NA"

						return [lengthMax,lengthMin,widthMax,widthMin]

						break;
					default:
						return reject('Building type enum does not exist!');
				}
			}

		switch (typeUserChange)
		{
			case userChange.buildingArea:

				// Calculate new floor area
				newbuildingArea = parseFloat(inpArea.value)

				factorChange = newbuildingArea/buildingArea

				lengthLocal = Math.sqrt(factorChange)*length

				widthLocal = Math.sqrt(factorChange)*width

				newFloorArea = newbuildingArea/numFloors

				minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

				calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				// Update building area for future
				buildingArea = newbuildingArea

				break;
			case userChange.numFloors:

				newNumOfFloors = parseFloat(inpFloors.value)

				factorChange = numFloors/newNumOfFloors

				lengthLocal = Math.sqrt(factorChange)*length

				widthLocal = Math.sqrt(factorChange)*width

				newFloorArea = buildingArea/newNumOfFloors

				minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

				calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				// Update building area for future
				numFloors = newNumOfFloors

				break;
			case userChange.lengthChange:

				lengthLocal = parseFloat(inpLength.value)

				factor = (width-widthMin)/(widthMax-widthMin)

				floorArea = buildingArea/numFloors
				//[lengthMax,lengthMin,widthMax,widthMin]
				minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

				localLengthMax = minmax[0]
				localLengthMin = minmax[1]
				localWidthMax = minmax[2]
				localWidthMin = minmax[3]

				if (buildingShape == buildingShapes.Boxshape)
				{
					widthLocal = floorArea/lengthLocal

					calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)
				}
				else {
					widthLocal = factor*(localWidthMax-localWidthMin)+localWidthMin
				}

				// Must re-calculate thickness for length change

				calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)

				break;

			case userChange.widthChange:

				floorArea = buildingArea/numFloors

				lengthLocal = length

				if (buildingShape == buildingShapes.Boxshape)
				{
					widthLocal = width
				}
				else {
					widthLocal = parseFloat(inpWidth.value)
				}

				localLengthMax = lengthMax
				localLengthMin = lengthMin
				localWidthMax = widthMax
				localWidthMin = widthMin

				calculateThicknessArea(buildingShape,floorArea,length,widthLocal)

				break;

			case userChange.buildingShape:

					floorArea = buildingArea/numFloors

					// Calculate Length and Width for each shape
					switch (buildingShape)
					{
						case buildingShapes.Lshape:

							lengthLocal = Math.sqrt(floorArea*1.8)

							widthLocal = Math.sqrt(floorArea*1.8)

							break;

						case buildingShapes.Hshape:

							lengthLocal = Math.sqrt(floorArea*(9/7))

							widthLocal = Math.sqrt(floorArea*(9/7))

							break;
						case buildingShapes.Tshape:

							lengthLocal = Math.sqrt(floorArea*1.8)

							widthLocal = Math.sqrt(floorArea*1.8)

							break;
						case buildingShapes.Boxshape:

							lengthLocal = Math.sqrt(floorArea)

							widthLocal = floorArea/lengthLocal

							break;
						default:
							return reject('Building type enum does not exist!');
					}

					minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

					calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)

					localLengthMax = minmax[0]
					localLengthMin = minmax[1]
					localWidthMax = minmax[2]
					localWidthMin = minmax[3]

			case userChange.irrevelent:
				factorChange = 1
				break;

			default:
				return reject('Type of user change doesnt exist');
		}

		return resolve({length:lengthLocal,width:widthLocal,lengthMax:localLengthMax,lengthMin:localLengthMin,widthMax:localWidthMax,widthMin:localWidthMin})
	}


	function initGeometryInputFields(){

		// Initialize the building as an object
		theBuilding = {};
		theBuilding.area = 5000;
		theBuilding.length = 50;
		theBuilding.lengthInit = 0;;
		theBuilding.width = 100;
		theBuilding.thickness = 20;
		theBuilding.storeys = 1;
		theBuilding.storeyHeight = 10;
		theBuilding.orientation = 0;

		inpArea.value = theBuilding.area;

		inpFloors.min = 1;
		inpFloors.max = 20;
		inpFloors.value = theBuilding.storeys;

		// inpHeight.min = 8;
		// inpHeight.max = 20;
		// inpHeight.value = theBuilding.storeyHeight;

		inpShapeCount.min = 1;
		inpShapeCount.max = 10;
		inpShapeCount.value = 3;

		selShape.innerHTML =
		'<option>Box-Shape</option>' +
		'<option>L-Shape</option>' +
		'<option>T-Shape</option>' +
		'<option>H-Shape</option>' +
		'';

		selShape.selectedIndex = 1;

		selMassing.innerHTML =
			'<option>Generator 1</option>' +
			'<option>Generator 2</option>' +
			'<option>Generator 3</option>' +
		'';

		inpPerimeterDepth.min = 10;
		inpPerimeterDepth.max = 20;
		inpPerimeterDepth.value = 5;

		inpOrientation.min = 0;
		inpOrientation.max = 350;
		inpOrientation.step = 10;
		inpOrientation.value = theBuilding.orientation;

		// Assign global variabless
		buildingArea = parseFloat(inpArea.value)
		numFloors = parseInt(inpFloors.value)

		implementUserChange(userChange.buildingShape,stringOfBuildingShapeToBuildingShapeEnum(selShape.value))

	}

	function updateShape(values) {

		// Update the sliders seen in the html document
		outLength.value = values.length
		outWidth.value = values.width

		// divValidation.innerHTML =
		// 	'<h3>Results from geometry logic</h3>' +
		// 	'<font size="-5">'
		// 	'building Area: ' + inpArea.value + '<br>' +
		// 	'number of Floors: ' + inpFloors.value + '<br>' +
		// 	'floor Area: ' + parseFloat(inpArea.value)/parseFloat(inpFloors.value) + '<br>' +
		// 	'<b>calculated floor Area: ' + calculatedFloorArea + '</b><br>' +
		// 	'<br>' +
		// 	'<b>Length<br></b>' +
		// 	'length: ' + values.length + '<br>' +
		// 	'lengthMin: ' + values.lengthMin + '<br>' +
		// 	'lengthMax: ' + values.lengthMax + '<br>' +
		// 	//			'lengthRange(): ' + lengthRange + '<br>' +
		// 	'<br>' +
		// 	'<b>Width</b><br>' +
		// 	'width: ' + values.width + '<br>' +
		// 	'widthMin: ' + values.widthMin + '<br>' +
		// 	'widthMax: ' + values.widthMax + '<br>' +
		// 	'<b>thickness:'+thickness+'</b><br>' +
		// 	//			'widthRange(): ' + widthRange + '<br>' +
		// 	'<br>' + '</font>' +
		// '';
		// Display thickness
		divValidation.innerHTML =
		'<b>thickness:'+thickness+'</b><br>' +
		'';

		const pathFunctions = [ getPathBox, getPathL, getPathT , getPathH ];

		// Leave out the building height for now
		// theBuilding.storeyHeight = parseInt( inpHeight.value, 10 );
		theBuilding.orientation = parseInt( inpOrientation.value, 10 );
		// Set Perimeter Depth
		theBuilding.perimeterDepth = parseInt( inpPerimeterDepth.value, 10 );

		const rotation = - d2r * theBuilding.orientation;
		// set the number of floors to the building
		theBuilding.storeys = numFloors
		const storeys = theBuilding.storeys;
		const height = theBuilding.storeyHeight;

		//		let mesh = theBuilding.mesh;

		scene.remove( theBuilding.mesh );

		if ( theBuilding.mesh ) {

			theBuilding.mesh.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		theBuilding.section = updateSection(values);

		const pathFunction = pathFunctions[ selShape.selectedIndex ];
		theBuilding.path = pathFunction(values);

		theBuilding.shape = selShape[ selShape.selectedIndex ].innerText;

		theBuilding.mesh = new THREE.Object3D();

		for ( var k = 0; k < theBuilding.storeys; k++ ) {

			const vertical = k * theBuilding.storeyHeight; //+ 0.5 * theBuilding.storeyHeight;
			const storey = k + 1;

			const mesh = createQlineMesh( k );
			//			mesh = createShape();
			mesh.position.z = vertical;
			mesh.rotation.z = rotation;
			mesh.name = 'shape-' + selShape.value.toLowerCase() + '-story-' + ( k + 1 );
			mesh.userData.storey = k;
			mesh.castShadow = mesh.receiveShadow = true;
			mesh.updateMatrixWorld();
			//console.log( 'mesh', mesh );
			theBuilding.mesh.add( mesh );

		}

		theBuilding.mesh.name = 'theBuilding';
		scene.add( theBuilding.mesh );

		onShapeChangeUpdateLayout();

	}

	function updateSection(values) {

		// For now do not do core perimeter zoning
		const width = theBuilding.perimeterDepth;
		const height = theBuilding.storeyHeight;
		//console.log( 'width', width );

		const section = [

			v2( -width, 0 ), v2( 0, 0 ), v2( 0, height ), v2( -width, height ), v2( -width, 0 )

		];

		return section;
	}


	function getPathBox(values) {

		const pathBox = [ v2( values.length, 0 ), v2( 0, 0 ), v2( 0, values.width ), v2( values.length, values.width ), v2( values.length, 0 ) ];

		return pathBox;

	}

	function getPathL(values) {

		const pathL = [
			v2( values.length, 0 ),
			v2( 0, 0 ),
			v2( 0, values.width ),
			v2( thickness, values.width ),
			v2( thickness, thickness ),
			v2( values.length, thickness ),
			v2( values.length, 0 )
		];

			return pathL;
	}

	function getPathT(values) {

		const pathT = [
			v2( values.length, 0 ),
			v2( 0, 0 ),
			v2( 0, thickness ),
			v2( 0.5 * ( values.length - thickness ), thickness ),
			v2( 0.5 * ( values.length - thickness ), values.width ),
			v2( values.length - 0.5 * ( values.length - thickness ), values.width ),
			v2( values.length - 0.5 * ( values.length - thickness ), thickness ),
			v2( values.length, thickness ),
			v2( values.length, 0 )
		];

		return pathT;

	}

	function getPathH(values) {

		const pathH = [
			v2( values.length - thickness, 0.5 * ( values.width - thickness ) ),
			v2( thickness, 0.5 * ( values.width - thickness ) ),
			v2( thickness, 0 ),
			v2( 0, 0 ),
			v2( 0, values.width ),
			v2( thickness, values.width ),
			v2( thickness, values.width - 0.5 * ( values.width - thickness ) ),
			v2( values.length - thickness, values.width - 0.5 * ( values.width - thickness ) ),
			v2( values.length - thickness, values.width ),
			v2( values.length, values.width ),
			v2( values.length, 0 ),
			v2( values.length - thickness, 0 ),
			v2( values.length - thickness, 0.5 * ( values.width - thickness ) )
		];

		return pathH;
	}


// #1
	function createShape() {

		let shape;

		shape = new THREE.Shape( theBuilding.path );
		const amount = theBuilding.storeyHeight;

		geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, amount: amount } );
		geometry.center();

		const material = new THREE.MeshPhongMaterial();
		const mesh = new THREE.Mesh( geometry, material );

		const edgesGeometry = new THREE.EdgesGeometry( geometry );
		const meshEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		mesh.add( meshEdges );

		return mesh;

	}


// or #2

	function createQlineMesh( storey ) {

		const path = theBuilding.path;
		const section = theBuilding.section;
		const len = theBuilding.length;
		const wid = theBuilding.width;

		const len05 = len * 0.5;
		const wid05 = wid * 0.5;

		const opacity = 100;

		const material = new THREE.MeshPhongMaterial( { opacity: ( opacity / 100 ), side: 2, flatShading: true, transparent: true, wireframe: false } );
		const materialNormal = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 1, side: 2, transparent: true, wireframe: false, } );
		const materialShape = new THREE.MeshPhongMaterial( { opacity: ( opacity / 100 ), side: 2, flatShading: true, transparent: true, wireframe: false } );

		const vertices = [];
		const shapePoints = [];

		const geometry = new THREE.PlaneGeometry( 10, 10, section.length - 1, path.length - 1 );

		const mesh = new THREE.Mesh( geometry, material );

		for ( let i = 0; i < section.length; i++ ) {

			vertices.push( offset ( mesh, path, section[ i ].x, section[ i ].y ) );

		};


		//console.log( 'vertices', vertices );

		for ( let i = 0, j = 0; i < path.length; i++ ) {

			for ( let k = 0; k < section.length; k++ ) {

				mesh.geometry.vertices[ j++ ] = vertices[ k ][ i ];

			}

			if ( i < path.length - 1 ) {

				// overhangs
				const hgt = theBuilding.storeyHeight; //pt1.distanceTo( pt3 );
				const pt1 = vertices[ 1 ][ i ];
				const pt2 = vertices[ 1 ][ i + 1 ];
				const len = pt1.distanceTo( pt2 );
				const vectorDelta = pt2.clone().sub( pt1 );
				const angle = Math.atan2( vectorDelta.y, vectorDelta.x );

			//theBuilding.overhangDepth = 10;

				if ( theBuilding.overhangDepth > 0 ) {

					const geoOver = new THREE.PlaneBufferGeometry( 1, 1 );
					const over = new THREE.Mesh( geoOver, materialShape );
					over.scale.set( len * theBuilding.wwr / 100, theBuilding.overhangDepth, theBuilding.overhangDepth );
					over.position.copy( vertices[ 1 ][ i ].clone().lerp( vertices[ 2 ][ i + 1 ].clone() , 0.5 ) );
					over.position.x -= len05;
					over.position.y -= wid05;
					over.rotation.z = angle;
					over.translateY( 0.5 * theBuilding.overhangDepth );
					over.translateZ( 0.5 * hgt * theBuilding.wwr / 100 );
					over.name = 'overhang';
					mesh.add( over );

				}

				const geo = new THREE.PlaneBufferGeometry( len * theBuilding.wwr / 100, hgt * theBuilding.wwr / 100 );

				const open = new THREE.Mesh( geo, materialNormal );
				geo.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI * 0.5 ) );
				open.position.copy( vertices[ 1 ][ i ].clone().lerp( vertices[ 2 ][ i + 1 ].clone(), 0.5 ) );
				open.position.x -= len05;
				open.position.y -= wid05;
				open.rotation.z = angle;
				open.translateY( 0.1 );
				open.name = 'opening';
				mesh.add( open );


				if ( storey === 0 ) {

					//					placard = drawPlacard( ['space ' + ( i + 1 ), 'angle ' + ( - r2d * angle + 90 ) ], 0.1, 120, open.position.x, open.position.y, 40 );
					placard = drawPlacard( 'angle ' + ( - r2d * angle + 90 ), 0.1, 120, open.position.x, open.position.y, 40 );

					mesh.add( placard );

				}

				// needed for export?
				shapePoints.push( pt2 );

			}

		}

		const shape = new THREE.Shape( path );
		const geometryShape = new THREE.ShapeGeometry( shape );
		geometryShape.applyMatrix( new THREE.Matrix4().makeTranslation( -len05, -wid05, 0 ) );
		const shapeMesh = new THREE.Mesh( geometryShape, materialShape );
		shapeMesh.name = storey === 0 ? 'SlabOnGrade' : 'InteriorFloor';
		mesh.add( shapeMesh );

		//console.log( 'theBuilding.storeys', storey, theBuilding.storeys  );

		if ( storey === theBuilding.storeys - 1 ) {

			const shape = new THREE.Shape( path );
			const geometryShape = new THREE.ShapeGeometry( shape );
			geometryShape.applyMatrix( new THREE.Matrix4().makeTranslation( -len05, -wid05, theBuilding.storeyHeight ) );
			const shapeMesh = new THREE.Mesh( geometryShape, materialShape );
			shapeMesh.name = 'roof';
			mesh.add( shapeMesh );

		}

		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();
		//		mesh.geometry.center();
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -len05, -wid05, 0 ) );

		return mesh;

	}



	function offset( obj, points, offsetX, offsetY ) {

		// 2016-02-10
		offsetX = -offsetX;
		var offsetY = offsetY ? offsetY : 0;
		var pt1, pt2, offsetPt1, offsetPt2, vector, angle;
		var line, lines, vertices;
		var pi05 = 0.5 * pi;
		var pi2 = 2 * pi;
		lines = [];

		for ( var i = 0; i < points.length - 1; i++ ) {

			pt1 = points[ i ];
			pt2 = points[ i + 1 ];

			vector = pt2.clone().sub( pt1 );
			angle = Math.atan2( vector.y, vector.x );

			offsetPt1 = v( pt1.x + offsetX * Math.cos( angle - pi05 ), pt1.y - offsetX * Math.sin( angle + pi05 ), 0 );
			offsetPt2 = v( pt2.x + offsetX * Math.cos( angle - pi05 ), pt2.y - offsetX * Math.sin( angle + pi05 ), 0 );

			line = new THREE.Line3( offsetPt1, offsetPt2 );
			lines.push( line );

			/* debug
						const geometry = new THREE.Geometry();
						geometry.vertices = [ offsetPt1, offsetPt2 ];
						const material = new THREE.LineBasicMaterial( { color: 'magenta' } );
						const line = new THREE.Line( geometry, material );
						line.position.y = -5;
						obj.add( line );
			*/

		}


		if ( points[ 0 ].distanceTo( points[ points.length - 1 ] ) < 0.01 ) {

			pt1 = intersectionTwoLines2( lines[ 0 ], lines [ lines.length - 1 ] );
			pt2 = pt1;

		} else {

			pt1 = lines[ 0 ].start;
			pt2 = lines[ lines.length - 1 ].end;

		}

		vertices = [ v( pt1.x, pt1.y, offsetY ) ];

		for ( var i = 0; i < lines.length; i++ ) {

			if ( i < lines.length - 1 ) {

				var pt = intersectionTwoLines2( lines[ i ], lines [ i + 1 ] );

			} else {

				pt = pt2;

			}

			vertices.push( v( pt.x, pt.y, offsetY ) );

		}

		// debug
		const geometryLine = new THREE.Geometry();
		geometryLine.vertices = vertices;
		const materialLine = new THREE.LineBasicMaterial( { color: 'yellow' } );
		const lineEdge = new THREE.Line( geometryLine, materialLine );
		obj.add( lineEdge );


		return vertices;

	}



	function intersectionTwoLines2( line1, line2 ) {

		// 2016-02-10
		// Thanks to http://jsfiddle.net/justin_c_rounds/Gd2S2/ && http://jsfiddle.net/user/justin_c_rounds/fiddles/

		const ptA = line1.start;
		const ptB = line1.end;
		const ptC = line2.start;
		const ptD = line2.end;

		const denominator = ( ptD.y - ptC.y ) * ( ptB.x - ptA.x ) - ( ptD.x - ptC.x ) * ( ptB.y - ptA.y );

		if ( denominator == 0 ) { return; }

		const a = ( ( ptD.x - ptC.x ) * ( ptA.y - ptC.y ) - ( ptD.y - ptC.y ) * ( ptA.x - ptC.x ) ) / denominator;
		const x = ptA.x + ( a * ( ptB.x - ptA.x ) );
		const y = ptA.y + ( a * ( ptB.y - ptA.y ) );

		return v( x, y, 0 );

	}
