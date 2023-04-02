;(function(){
  advancedColorPicker = document.createElement('div');
  advancedColorPicker.id = 'advanced-color-picker';
  advancedColorPicker.setAttribute('tabindex', 0);

  // advancedColorPicker.setAttribute('debug', '');

  //todo: may add buttons to save or cancel color picker
  //todo: may add option to upload background image
  advancedColorPicker.innerHTML = `
    <ul class="color-list">
      <li class="color-list-selected"></li>
      <li class="color-list-add-new"></li>
    </ul>
    <div class="color-input-column">
      <div class="color-output">#ff0000</div>
      <svg class="color-output-copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
      <svg class="color-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
    </div>
    <div class="color-input-column">
      <div class="color-input-sl">
        <div class="color-input-selector"></div>
      </div>
      <div class="color-input-a">
        <div class="color-input-selector"></div>
      </div>
    </div>
    <div class="color-input-h">
      <div class="color-input-selector"></div>
    </div>
    <div class="color-input-column">
      <div class="color-gradient-dir">
        <div class="color-input-selector"></div>
      </div>
      <ul class="color-gradient-type">
        <li><svg class="gradient-output-copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg></li>
        <li class="color-gradient-linear color-gradient-type-active"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z"/></svg></li>
        <li class="color-gradient-radial"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg></li>
      </ul>
    </div>
  `;

  const mainElm = (function(){
    let main = document.querySelector('main');
    if(main){
      return main;
    }
    return document.body || document.querySelector('body');
  })();
  mainElm.appendChild(advancedColorPicker);

  let selHSVA = [[0, 100, 100, 1]];
  let editHSVA = 0;
  let valueType = 0; // 0 = hex, 1 = rgba, 2 = hsl
  let editElm = null;
  let gradientData = null;

  const inputH = advancedColorPicker.querySelector('.color-input-h');
  const inputSL = advancedColorPicker.querySelector('.color-input-sl');
  const inputA = advancedColorPicker.querySelector('.color-input-a');

  const selH = inputH.querySelector('.color-input-selector');
  const selSL = inputSL.querySelector('.color-input-selector');
  const selA = inputA.querySelector('.color-input-selector');

  const output = advancedColorPicker.querySelector('.color-output');
  const outputCopyBtn = advancedColorPicker.querySelector('.color-output-copy');
  const gradientCopyBtn = advancedColorPicker.querySelector('.gradient-output-copy');

  const gradientDir = advancedColorPicker.querySelector('.color-gradient-dir');
  const gradientDirSel = gradientDir.querySelector('.color-input-selector');

  const gradientTypeLinear = advancedColorPicker.querySelector('.color-gradient-linear');
  const gradientTypeRadial = advancedColorPicker.querySelector('.color-gradient-radial');

  const colorList = advancedColorPicker.querySelector('.color-list');
  const colorListAddBtn = advancedColorPicker.querySelector('.color-list-add-new');
  const colorListTrashBtn = advancedColorPicker.querySelector('.color-trash');

  // set color value
  advancedColorPicker.addEventListener('focusout', function() {
    if(editElm){
      let strVal;
      if(selHSVA.length > 1){
        if(gradientData){
          strVal = `${gradientData.type}-gradient(`;
          if(gradientData.dir && gradientData.type !== 'radial'){
            strVal += gradientData.dir + ', ';
          }
        }else{
          strVal = 'linear-gradient(';
          gradientData = {type: 'linear'};
        }

        let lastEditHSVA = editHSVA;
        for(let i = 0; i < selHSVA.length; i++){
          editHSVA = i;
          setInputVars(false, true);

          strVal += output.textContent;
          if(gradientData.pos && gradientData.pos[i]){
            strVal += ' ' + gradientData.pos[i];
          }
          if(i + 1 !== selHSVA.length){
            strVal += ', '
          }
        }
        editHSVA = lastEditHSVA;
        setInputVars(false, true);

        strVal += ')';
      }else{
        strVal = output.textContent;
      }

      editElm.setAttribute('value', strVal);
      editElm.setCustomValidity('');
      editElm.style.setProperty('--color-value', strVal);
      if(strVal.match(/^[\w_-]+-gradient\s*\(/)){
        editElm.setAttribute('gradient-type', strVal.replace(/^([\w_-]+-gradient)\s*\(.*$/, '$1'));
      }else{
        editElm.removeAttribute('gradient-type')
      }
    }

    gradientDirSel.style['left'] = '';
    gradientDirSel.style['top'] = '';

    advancedColorPicker.style['display'] = '';
    editElm = null;
  });

  function selectListColor(e){
    e.target.parentNode.querySelectorAll('li:not(.color-list-add-new)').forEach(function(elm) {
      if(elm.classList.contains('color-list-selected')){
        elm.classList.remove('color-list-selected');
        let hsl = hsvToHsl(selHSVA[editHSVA]);
        elm.style.setProperty('--color-input-h', hsl[0]);
        elm.style.setProperty('--color-input-s', hsl[1] + '%');
        elm.style.setProperty('--color-input-l', hsl[2] + '%');
        elm.style.setProperty('--color-input-a', selHSVA[editHSVA][3]);
      }
    });

    e.target.classList.add('color-list-selected');
    e.target.style.removeProperty('--color-input-h');
    e.target.style.removeProperty('--color-input-s');
    e.target.style.removeProperty('--color-input-l');
    e.target.style.removeProperty('--color-input-a');

    editHSVA = Number(e.target.getAttribute('item-index'));
    setInputVars(true);
  }

  colorListAddBtn.addEventListener('click', function() {
    colorList.querySelectorAll('li:not(.color-list-add-new)').forEach(function(elm) {
      if(elm.classList.contains('color-list-selected')){
        elm.classList.remove('color-list-selected');
        let hsl = hsvToHsl(selHSVA[editHSVA]);
        elm.style.setProperty('--color-input-h', hsl[0]);
        elm.style.setProperty('--color-input-s', hsl[1] + '%');
        elm.style.setProperty('--color-input-l', hsl[2] + '%');
        elm.style.setProperty('--color-input-a', selHSVA[editHSVA][3]);
      }
    });

    let li = document.createElement('li');
    li.setAttribute('item-index', selHSVA.length);
    li.classList.add('color-list-selected');
    li.addEventListener('click', selectListColor);
    colorList.insertBefore(li, colorListAddBtn);
    editHSVA = selHSVA.length;
    selHSVA.push([0, 100, 100, 1]);
    setInputVars(true);
  });

  colorListTrashBtn.addEventListener('click', function() {
    colorList.querySelectorAll('li:not(.color-list-add-new)').forEach(function(elm) {
      if(elm.classList.contains('color-list-selected')){
        elm.classList.remove('color-list-selected');
        let hsl = hsvToHsl(selHSVA[editHSVA]);
        elm.style.setProperty('--color-input-h', hsl[0]);
        elm.style.setProperty('--color-input-s', hsl[1] + '%');
        elm.style.setProperty('--color-input-l', hsl[2] + '%');
        elm.style.setProperty('--color-input-a', selHSVA[editHSVA][3]);
      }

      let ind = Number(elm.getAttribute('item-index'));
      if(ind === editHSVA){
        elm.remove();
      }else if(ind === editHSVA-1 || (editHSVA === 0 && ind === editHSVA+1)){
        elm.classList.add('color-list-selected');
        elm.style.removeProperty('--color-input-h');
        elm.style.removeProperty('--color-input-s');
        elm.style.removeProperty('--color-input-l');
        elm.style.removeProperty('--color-input-a');
      }
    });

    let i = 0;
    colorList.querySelectorAll('li:not(.color-list-add-new)').forEach(function(elm){
      elm.setAttribute('item-index', i);
      i++;
    });

    if(gradientData && gradientData.pos){
      gradientData.pos.splice(editHSVA, 1);
    }

    selHSVA.splice(editHSVA, 1);
    editHSVA--;
    if(editHSVA < 0){
      editHSVA = 0
    }

    setInputVars(true);
  });

  function setInputVars(setMouse = false, skipGradient = false){
    let hsl = hsvToHsl(selHSVA[editHSVA]);
    advancedColorPicker.style.setProperty('--color-input-h', hsl[0]);
    advancedColorPicker.style.setProperty('--color-input-s', hsl[1] + '%');
    advancedColorPicker.style.setProperty('--color-input-l', hsl[2] + '%');
    advancedColorPicker.style.setProperty('--color-input-a', selHSVA[editHSVA][3]);

    let strVal = '';
    switch (valueType) {
      case 0:
        strVal = hslToHex(hsl);
        if(selHSVA[editHSVA][3] < 1){
          strVal += alphaToHex(selHSVA[editHSVA][3]);
        }
        break;
      case 1:
        let rgb = hslToRgb(hsl);
        if(selHSVA[editHSVA][3] < 1){
          strVal = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${selHSVA[editHSVA][3]})`;
        }else{
          strVal = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
        break;
      case 2:
        if(selHSVA[editHSVA][3] < 1){
          strVal = `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${selHSVA[editHSVA][3]})`;
        }else{
          strVal = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        }
        break;
      default:
        break;
    }

    output.textContent = strVal;

    if(setMouse){
      selH.style['left'] = Math.round(selHSVA[editHSVA][0] * (inputH.clientWidth - 20) / 360) + 'px';
      selSL.style['left'] = Math.round(selHSVA[editHSVA][1] * (inputSL.clientWidth - 20) / 100) + 'px';
      selSL.style['top'] = Math.round(((selHSVA[editHSVA][2] - 100) * -1) * (inputSL.clientHeight - 20) / 100) + 'px';
      selA.style['top'] = Math.round((((selHSVA[editHSVA][3] * 100) - 100) * -1) * (inputA.clientHeight - 20) / 100);

      if(selHSVA.length > 1){
        colorListTrashBtn.style['display'] = 'block';
      }else{
        colorListTrashBtn.style['display'] = 'none';
      }
    }

    if(!skipGradient){
      let strVal;
      if(selHSVA.length > 1){
        if(gradientData){
          strVal = `${gradientData.type}-gradient(`;
          if(gradientData.dir && gradientData.type !== 'radial'){
            strVal += gradientData.dir + ', ';
          }
        }else{
          strVal = 'linear-gradient(';
          gradientData = {type: 'linear'};
        }

        let lastEditHSVA = editHSVA;
        for(let i = 0; i < selHSVA.length; i++){
          editHSVA = i;
          setInputVars(false, true);

          strVal += output.textContent;
          if(gradientData.pos && gradientData.pos[i]){
            strVal += ' ' + gradientData.pos[i];
          }
          if(i + 1 !== selHSVA.length){
            strVal += ', '
          }
        }
        editHSVA = lastEditHSVA;
        setInputVars(false, true);

        strVal += ')';
      }else{
        strVal = output.textContent;
      }

      if(strVal.match(/^[\w_-]+-gradient\s*\(/)){
        gradientDir.style.setProperty('--color-gradient', strVal);
        if(gradientData.dir){
          gradientDir.style.setProperty('--color-gradient-dir', gradientData.dir.replace('deg', ''));
        }else{
          gradientDir.style.setProperty('--color-gradient-dir', '180');
        }
        gradientDir.parentNode.style['display'] = 'flex';
      }else{
        gradientDir.parentNode.style['display'] = 'none';
      }
    }
  }

  let mouseDown = null;
  document.addEventListener('mouseup', function() {
    mouseDown = null;
  });

  function onClickH(e){
    mouseDown = inputH;
    let rect = inputH.getBoundingClientRect();
    let x = e.clientX - (rect.left + 10);
    let w = rect.width - 20;

    if(x < 0){
      x = 0;
    }else if(x > w){
      x = w;
    }

    selH.style['left'] = x + 'px';

    selHSVA[editHSVA][0] = Math.round(x * 360 / w);

    setInputVars();
  }
  inputH.addEventListener('mousedown', onClickH);

  function onClickSL(e){
    mouseDown = inputSL;
    let rect = inputSL.getBoundingClientRect();
    let x = e.clientX - (rect.left + 10);
    let y = e.clientY - (rect.top + 10);
    let w = rect.width - 20;
    let h = rect.height - 20;

    if(x < 0){
      x = 0;
    }else if(x > w){
      x = w;
    }

    if(y < 0){
      y = 0;
    }else if(y > h){
      y = h;
    }

    selSL.style['left'] = x + 'px';
    selSL.style['top'] = y + 'px';

    selHSVA[editHSVA][1] = Math.round(x * 100 / w);
    selHSVA[editHSVA][2] = 100 - Math.round(y * 100 / h);

    setInputVars();
  }
  inputSL.addEventListener('mousedown', onClickSL);

  function onClickA(e){
    mouseDown = inputA;
    let rect = inputA.getBoundingClientRect();
    let y = e.clientY - (rect.top + 10);
    let h = rect.height - 20;

    if(y < 0){
      y = 0;
    }else if(y > h){
      y = h;
    }

    selA.style['top'] = y + 'px';

    selHSVA[editHSVA][3] = Math.round(100 - (y * 100 / h)) / 100;

    setInputVars();
  }
  inputA.addEventListener('mousedown', onClickA);

  function onClickGradientDir(e){
    mouseDown = gradientDir;
    let rect = gradientDir.getBoundingClientRect();
    let x = e.clientX - (rect.left + 10);
    let y = e.clientY - (rect.top + 10);
    let w = rect.width - 20;
    let h = rect.height - 20;

    if(x < 0){
      x = 0;
    }else if(x > w){
      x = w;
    }

    if(y < 0){
      y = 0;
    }else if(y > h){
      y = h;
    }

    gradientDirSel.style['left'] = x + 'px';
    gradientDirSel.style['top'] = y + 'px';

    x = (x * 200 / w) - 100;
    y = (y * 200 / h) - 100;

    let deg = Math.round(xyToDeg(x, y));
    deg -= 90;
    if(deg < 0){
      deg += 360;
    }

    if(!gradientData){
      gradientData = {type: 'linear'};
    }
    gradientData.dir = deg + 'deg';

    setInputVars();
  }
  gradientDir.addEventListener('mousedown', onClickGradientDir);

  gradientTypeLinear.addEventListener('click', function() {
    gradientTypeLinear.classList.add('color-gradient-type-active');
    gradientTypeRadial.classList.remove('color-gradient-type-active');

    if(!gradientData){
      gradientData = {};
    }

    gradientData.type = 'linear';

    setInputVars();
  });

  gradientTypeRadial.addEventListener('click', function() {
    gradientTypeRadial.classList.add('color-gradient-type-active');
    gradientTypeLinear.classList.remove('color-gradient-type-active');

    if(!gradientData){
      gradientData = {};
    }

    gradientData.type = 'radial';

    setInputVars();
  });

  document.addEventListener('mousemove', function(e){
    if(mouseDown === inputH){
      onClickH(e);
    }else if(mouseDown === inputSL){
      onClickSL(e);
    }else if(mouseDown === inputA){
      onClickA(e);
    }else if(mouseDown === gradientDir){
      onClickGradientDir(e);
    }
  });

  output.addEventListener('click', function() {
    valueType++;
    if(valueType > 2){
      valueType = 0;
    }

    setInputVars();
  });

  outputCopyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(output.textContent);
  });

  gradientCopyBtn.addEventListener('click', function() {
    let strVal;
    if(selHSVA.length > 1){
      if(gradientData){
        strVal = `${gradientData.type}-gradient(`;
        if(gradientData.dir && gradientData.type !== 'radial'){
          strVal += gradientData.dir + ', ';
        }
      }else{
        strVal = 'linear-gradient(';
        gradientData = {type: 'linear'};
      }

      let lastEditHSVA = editHSVA;
      for(let i = 0; i < selHSVA.length; i++){
        editHSVA = i;
        setInputVars(false, true);

        strVal += output.textContent;
        if(gradientData.pos && gradientData.pos[i]){
          strVal += ' ' + gradientData.pos[i];
        }
        if(i + 1 !== selHSVA.length){
          strVal += ', '
        }
      }
      editHSVA = lastEditHSVA;
      setInputVars(false, true);

      strVal += ')';
    }else{
      strVal = output.textContent;
    }

    navigator.clipboard.writeText(strVal);
  });

  function onColorInputClick(elm){
    editElm = elm;

    if(elm.hasAttribute('no-gradient')){
      colorList.style['display'] = 'none';
    }else{
      colorList.style['display'] = '';
    }

    if(elm.hasAttribute('no-alpha')){
      inputA.style['display'] = 'none';
    }else{
      inputA.style['display'] = '';
    }

    let val = elm.getAttribute('value');
    if(!val || val === ''){
      val = '#ff0000';
    }

    // split gradient values
    if(val.match(/^[\w_-]+-gradient/)){
      val.replace(/^([\w_-]+)-gradient\s*\(\s*(.*)\s*\)$/, function(_, type, v){
        gradientData = {type};
        val = v.split(/(#[A-Fa-f0-9]+|rgba?\s*\(.*?\)|hsla?\s*\(.*?\))/).map(function(v){
          v = v.replace(/\s*,\s*$/, '').trim(' ');
          if(v.endsWith('deg') || v.startsWith('to')){
            gradientData.dir = v;
            return;
          }

          if(v.endsWith('%')){
            if(!gradientData.pos){
              gradientData.pos = [];
            }
            gradientData.pos.push(v);
            return;
          }

          return v;
        }).filter(function(v){
          return !!v;
        });
      });
    }

    if(!Array.isArray(val)){
      val = [val];
    }

    editHSVA = 0;
    selHSVA = [];

    colorList.querySelectorAll('li:not(.color-list-add-new)').forEach(function(elm) {
      elm.remove();
    });

    for(let i = 0; i < val.length; i++){
      if(val[i].startsWith('#')){
        if(i === 0){
          valueType = 0;
        }
        val[i].replace(/^#([A-Za-z0-9]{6}|[A-Za-z0-9]{3})([A-Za-z0-9]{1,2}|)$/, function(_, hex, a){
          let hsv = rgbToHsv(hexToRgb(hex));
          let alpha = 1;
          if(a && a !== ''){
            alpha = hexToAlpha(a);
          }
          hsv.push(alpha);
          selHSVA.push(hsv);

          let li = document.createElement('li');
          li.setAttribute('item-index', i);
          if(i !== 0){
            let hsl = hsvToHsl(hsv);
            li.style.setProperty('--color-input-h', hsl[0]);
            li.style.setProperty('--color-input-s', hsl[1] + '%');
            li.style.setProperty('--color-input-l', hsl[2] + '%');
            li.style.setProperty('--color-input-a', hsv[3]);
          }else{
            li.classList.add('color-list-selected');
          }
          li.addEventListener('click', selectListColor);
          colorList.insertBefore(li, colorListAddBtn);
        });
      }else if(val[i].startsWith('rgb')){
        if(i === 0){
          valueType = 1;
        }
        val[i].replace(/^rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,?\s*([0-9]+|)\s*\)\s*$/, function(_, r, g, b, a){
          let hsv = rgbToHsv([Number(r), Number(g), Number(b)]);
          if(a && a !== ''){
            hsv.push(Number(a));
          }else{
            hsv.push(1);
          }
          selHSVA.push(hsv);

          
          let li = document.createElement('li');
          li.setAttribute('item-index', i);
          if(i !== 0){
            let hsl = hsvToHsl(hsv);
            li.style.setProperty('--color-input-h', hsl[0]);
            li.style.setProperty('--color-input-s', hsl[1] + '%');
            li.style.setProperty('--color-input-l', hsl[2] + '%');
            li.style.setProperty('--color-input-a', hsv[3]);
          }else{
            li.classList.add('color-list-selected');
          }
          li.addEventListener('click', selectListColor);
          colorList.insertBefore(li, colorListAddBtn);
        });
      }else if(val[i].startsWith('hsl')){
        if(i === 0){
          valueType = 2;
        }
        val[i].replace(/^hsla?\s*\(\s*([0-9]+)(?:deg|)\s*,\s*([0-9]+%?)\s*,\s*([0-9]+%?)\s*,?\s*([0-9]+|)\s*\)\s*$/, function(_, h, s, l, a){
          if(s.endsWith('%')){
            s = Number(s.replace(/%$/, ''));
          }else{
            s = Number(s) * 100;
          }
          if(l.endsWith('%')){
            l = Number(l.replace(/%$/, ''));
          }else{
            l = Number(l) * 100;
          }

          let hsv = hslToHsv([Number(h), s, l]);
          if(a && a !== ''){
            hsv.push(Number(a));
          }else{
            hsv.push(1);
          }
          selHSVA.push(hsv);

          let li = document.createElement('li');
          li.setAttribute('item-index', i);
          if(i !== 0){
            let hsl = hsvToHsl(hsv);
            li.style.setProperty('--color-input-h', hsl[0]);
            li.style.setProperty('--color-input-s', hsl[1] + '%');
            li.style.setProperty('--color-input-l', hsl[2] + '%');
            li.style.setProperty('--color-input-a', hsv[3]);
          }else{
            li.classList.add('color-list-selected');
          }
          li.addEventListener('click', selectListColor);
          colorList.insertBefore(li, colorListAddBtn);
        });
      }
    }
    if(!selHSVA.length){
      selHSVA.push([0, 100, 100, 1]);
    }

    // advancedColorPicker.style['top'] = ;
    let elmRect = elm.getBoundingClientRect();
    advancedColorPicker.style['top'] = (elmRect.y + elmRect.height + 10) + 'px';
    advancedColorPicker.style['left'] = elmRect.x + 'px';

    advancedColorPicker.style['display'] = 'flex';
    let acpRect = advancedColorPicker.getBoundingClientRect();
    if(acpRect.y + acpRect.height + 10 > window.innerHeight){
      advancedColorPicker.style['top'] = (elmRect.y - acpRect.height - 10) + 'px';
    }
    if(acpRect.x + acpRect.width + 10 > window.innerWidth){
      advancedColorPicker.style['left'] = (elmRect.x + elmRect.width - acpRect.width) + 'px';
    }

    advancedColorPicker.focus();

    setInputVars(true);
  }

  function initColorInputs(){
    document.querySelectorAll('input[type="color"]:not([advanced-color-picker-ready])').forEach(function(elm){
      elm.setAttribute('advanced-color-picker-ready', '');
  
      let val = elm.getAttribute('value');
      if(val && val !== ''){
        elm.style.setProperty('--color-value', elm.getAttribute('value'));
  
        if(val.match(/^[\w_-]+-gradient\s*\(/)){
          elm.setAttribute('gradient-type', val.replace(/^([\w_-]+-gradient)\s*\(.*$/, '$1'));
        }else{
          elm.removeAttribute('gradient-type');
        }
      }else{
        elm.setAttribute('value', '#ff0000');
        elm.style.setProperty('--color-value', '#ff0000');
        elm.removeAttribute('gradient-type');
      }
  
      elm.addEventListener('click', function(e) {
        e.preventDefault();
        onColorInputClick(elm);
      });
    });
  }
  initColorInputs();
  setTimeout(initColorInputs, 1000);


  function xyToDeg(x1, y1){
    let x2 = 0;
    let y2 = 0;
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let rad = Math.atan2(deltaY, deltaX);

    return rad * (180 / Math.PI);
  }


  // color convert
  function hsvToHsl(hsv){
    // determine the lightness in the range [0,100]
    let l = (2 - hsv[1] / 100) * hsv[2] / 2;

    // store the HSL components
    hsl = [
      hsv[0],
      hsv[1] * hsv[2] / (l < 50 ? l * 2 : 200 - l * 2),
      l
    ];
  
    // correct a division-by-zero error
    if (isNaN(hsl[1])) {hsl[1] = 0};

    // round
    hsl[0] = Math.round(hsl[0]);
    hsl[1] = Math.round(hsl[1]);
    hsl[2] = Math.round(hsl[2]);

    return hsl;
  }

  function hslToHsv(hsl) {
    let l = hsl[1] * (hsl[2] < 50 ? hsl[2] : 100 - hsl[2]) / 100;
    let s = l === 0 ? 0 : 2 * l / (hsl[2] + l) * 100;
    let v = hsl[2] + l;
    return [hsl[0], s, v];
  }

  function hexToRgb(hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])(?:[a-f\d]{1,2}|)$/, '#$1$1$2$2$3$3');

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})(?:[a-f\d]{2}|)$/i.exec(hex);
    if(result){
      return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ];
    }
    return null;
  }

  function rgbToHsv(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), Math.round((v&&c/v) * 100), Math.round(v / 255 * 100)];
  }

  function hslToRgb(hsl){
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    const k = n => (n + hsl[0] / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  }

  function hslToHex(hsl) {
    hsl[2] /= 100;
    const a = hsl[1] * Math.min(hsl[2], 1 - hsl[2]) / 100;
    const f = n => {
      const k = (n + hsl[0] / 30) % 12;
      const color = hsl[2] - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function alphaToHex(opacity) {
    let a = Math.round(opacity * 255);
    return a.toString(16);
  }

  function hexToAlpha(opacity) {
    return Math.round(parseInt(opacity, 16) / 255 * 100) / 100;
  }
})();
