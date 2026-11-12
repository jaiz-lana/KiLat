/**
 * studentEngine.js - Mesin Pemrosesan Fitur Mahasiswa & Dokumen untuk KiLat
 * 100% Client-Side Processing di Browser (Offline & Aman)
 */

// --- PRESET HELPERS ---
function setTargetPdfPreset(val, unit) {
    const inp = document.getElementById('opt-pdf-target-val');
    const u = document.getElementById('opt-pdf-target-unit');
    if (inp) inp.value = val;
    if (u) u.value = unit;
}

function switchSigTab(tab) {
    const drawC = document.getElementById('sig-draw-container');
    const uploadC = document.getElementById('sig-upload-container');
    const tabDraw = document.getElementById('tab-sig-draw');
    const tabUpload = document.getElementById('tab-sig-upload');
    if (tab === 'draw') {
        if (drawC) drawC.classList.remove('hidden');
        if (uploadC) uploadC.classList.add('hidden');
        if (tabDraw) { tabDraw.className = "flex-1 py-2 text-xs font-bold bg-brand-green text-white rounded-lg shadow-sm"; }
        if (tabUpload) { tabUpload.className = "flex-1 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"; }
    } else {
        if (drawC) drawC.classList.add('hidden');
        if (uploadC) uploadC.classList.remove('hidden');
        if (tabUpload) { tabUpload.className = "flex-1 py-2 text-xs font-bold bg-brand-green text-white rounded-lg shadow-sm"; }
        if (tabDraw) { tabDraw.className = "flex-1 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg"; }
    }
}

let sigPadState = {
    canvas: null,
    ctx: null,
    drawing: false,
    color: '#0f172a',
    hasDrawn: false,
    uploadedBlob: null
};

function initSignaturePad() {
    const canvas = document.getElementById('sig-pad-canvas');
    if (!canvas) return;
    
    // Set actual resolution
    canvas.width = canvas.parentElement.clientWidth || 460;
    canvas.height = 160;
    
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = sigPadState.color;
    
    sigPadState.canvas = canvas;
    sigPadState.ctx = ctx;
    sigPadState.hasDrawn = false;
    
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    
    function startDraw(e) {
        sigPadState.drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        sigPadState.hasDrawn = true;
    }
    
    function moveDraw(e) {
        if (!sigPadState.drawing) return;
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
    
    function stopDraw() {
        if (!sigPadState.drawing) return;
        sigPadState.drawing = false;
        ctx.closePath();
    }
    
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', stopDraw);
    
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    window.addEventListener('touchend', stopDraw);
    
    // File upload handler
    const fileInp = document.getElementById('sig-file-upload');
    if (fileInp) {
        fileInp.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                sigPadState.uploadedBlob = file;
                const prevBox = document.getElementById('sig-upload-preview');
                const prevImg = document.getElementById('sig-preview-img');
                if (prevBox && prevImg) {
                    prevImg.src = URL.createObjectURL(file);
                    prevBox.classList.remove('hidden');
                }
            }
        });
    }
}

function clearSignaturePad() {
    if (!sigPadState.canvas || !sigPadState.ctx) return;
    sigPadState.ctx.clearRect(0, 0, sigPadState.canvas.width, sigPadState.canvas.height);
    sigPadState.hasDrawn = false;
}

function setSigColor(c) {
    sigPadState.color = c;
    if (sigPadState.ctx) sigPadState.ctx.strokeStyle = c;
}

function setWatermarkPreset(text) {
    const el = document.getElementById('opt-id-wm-text');
    if (el) el.value = text;
}

function setScannerPreset(preset) {
    const hid = document.getElementById('opt-scanner-filter');
    if (hid) hid.value = preset;
    
    const bMagic = document.getElementById('btn-scan-magic');
    const bGray = document.getElementById('btn-scan-gray');
    const bColor = document.getElementById('btn-scan-color');
    
    [bMagic, bGray, bColor].forEach(b => {
        if (!b) return;
        b.className = "p-3 text-left border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-xl transition-all";
    });
    
    if (preset === 'magic_bw' && bMagic) {
        bMagic.className = "p-3 text-left border-2 border-brand-green bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl transition-all";
    } else if (preset === 'grayscale' && bGray) {
        bGray.className = "p-3 text-left border-2 border-brand-green bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl transition-all";
    } else if (preset === 'color_boost' && bColor) {
        bColor.className = "p-3 text-left border-2 border-brand-green bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl transition-all";
    }
}

function toRoman(num, lower = true) {
    if (!num || num < 1) return '';
    const lookup = { m:1000, cm:900, d:500, cd:400, c:100, xc:90, l:50, xl:40, x:10, ix:9, v:5, iv:4, i:1 };
    let roman = '';
    for (let i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return lower ? roman : roman.toUpperCase();
}

function copyOcrResult() {
    const txtArea = document.getElementById('ocr-extracted-text');
    if (!txtArea || !txtArea.value.trim()) {
        showToast('Tidak ada teks untuk disalin', 'error');
        return;
    }
    navigator.clipboard.writeText(txtArea.value).then(() => {
        showToast('Teks berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
        txtArea.select();
        document.execCommand('copy');
        showToast('Teks berhasil disalin!', 'success');
    });
}

function downloadOcrResult() {
    const txtArea = document.getElementById('ocr-extracted-text');
    if (!txtArea || !txtArea.value.trim()) {
        showToast('Tidak ada teks untuk diunduh', 'error');
        return;
    }
    const blob = new Blob([txtArea.value], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, 'KiLat_OCR_Hasil.txt');
}

// --- STUDENT DISPATCHER ---
async function processStudentTool() {
    const cid = currentTool.id;
    if (cid === 'compress_pdf_target') {
        await executeTargetPdfCompression();
    } else if (cid === 'pdf_signature') {
        await executePdfSignature();
    } else if (cid === 'thesis_page_num') {
        await executeThesisPageNum();
    } else if (cid === 'id_watermark') {
        await executeIdWatermark();
    } else if (cid === 'doc_scanner') {
        await executeDocScanner();
    } else if (cid === 'ocr_tool') {
        await executeOcrTool();
    } else {
        showToast('Fitur mahasiswa belum didukung', 'error');
    }
}

// -------------------------------------------------------------
// 1. TARGET SIZE PDF COMPRESSOR
// -------------------------------------------------------------
async function executeTargetPdfCompression() {
    const f = currentFiles[0];
    if (!f) return;
    
    const targetVal = parseFloat(document.getElementById('opt-pdf-target-val')?.value || '500');
    const targetUnit = document.getElementById('opt-pdf-target-unit')?.value || 'KB';
    const targetBytes = targetUnit === 'MB' ? targetVal * 1024 * 1024 : targetVal * 1024;
    const dpiMode = document.getElementById('opt-pdf-dpi-mode')?.value || 'auto';
    const colorMode = document.getElementById('opt-pdf-color-mode')?.value || 'color';

    updateGlobalProgress(15, 'Membaca struktur PDF...');
    updateProgress(0, 15, 'Membaca dokumen...');
    
    const bytes = await f.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
    const numPages = pdfDoc.numPages;
    
    // Estimate initial rendering scale and quality based on per-page budget
    const budgetPerPage = targetBytes / numPages;
    let baseScale = 1.25;
    let baseQuality = 0.65;
    
    if (dpiMode === 'high') {
        baseScale = 1.5;
        baseQuality = 0.75;
    } else if (dpiMode === 'low' || budgetPerPage < 50 * 1024) {
        baseScale = 1.0;
        baseQuality = 0.45;
    } else if (budgetPerPage < 100 * 1024) {
        baseScale = 1.15;
        baseQuality = 0.55;
    }

    const { PDFDocument } = PDFLib;
    let newDoc = await PDFDocument.create();
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        if (cancelRequested) return;
        
        const pct = Math.floor(15 + (pageNum / numPages) * 75);
        updateGlobalProgress(pct, `Mengompres halaman ${pageNum} dari ${numPages}...`);
        updateProgress(0, pct, `Halaman ${pageNum}/${numPages}`);
        
        const page = await pdfDoc.getPage(pageNum);
        const origViewport = page.getViewport({ scale: 1.0 });
        const viewport = page.getViewport({ scale: baseScale });
        
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        await page.render({ canvasContext: ctx, viewport: viewport }).promise;
        
        // Grayscale conversion if requested
        if (colorMode === 'grayscale') {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
                const y = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
                d[i] = d[i+1] = d[i+2] = y;
            }
            ctx.putImageData(imgData, 0, 0);
        }
        
        // Convert to compressed JPEG blob
        const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', baseQuality));
        const imgBuffer = await blob.arrayBuffer();
        const embeddedImg = await newDoc.embedJpg(imgBuffer);
        
        const newPage = newDoc.addPage([origViewport.width, origViewport.height]);
        newPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: origViewport.width,
            height: origViewport.height
        });
    }
    
    if (cancelRequested) return;
    
    updateGlobalProgress(92, 'Menyusun hasil akhir...');
    let finalBytes = await newDoc.save({ useObjectStreams: true });
    
    // If still exceeds target and we can lower quality, run a fast pass
    if (finalBytes.length > targetBytes && baseQuality > 0.35) {
        updateGlobalProgress(94, 'Menyesuaikan agar pas target...');
        // Try re-encoding with lower quality
        const reducedQuality = Math.max(0.25, baseQuality * 0.65);
        newDoc = await PDFDocument.create();
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const origViewport = page.getViewport({ scale: 1.0 });
            const viewport = page.getViewport({ scale: baseScale * 0.85 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport }).promise;
            if (colorMode === 'grayscale') {
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const d = imgData.data;
                for (let i = 0; i < d.length; i += 4) {
                    const y = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
                    d[i] = d[i+1] = d[i+2] = y;
                }
                ctx.putImageData(imgData, 0, 0);
            }
            const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', reducedQuality));
            const imgBuffer = await blob.arrayBuffer();
            const embeddedImg = await newDoc.embedJpg(imgBuffer);
            const newPage = newDoc.addPage([origViewport.width, origViewport.height]);
            newPage.drawImage(embeddedImg, {
                x: 0, y: 0,
                width: origViewport.width, height: origViewport.height
            });
        }
        finalBytes = await newDoc.save({ useObjectStreams: true });
    }
    
    const finalBlob = new Blob([finalBytes], { type: 'application/pdf' });
    const savedPercent = ((1 - finalBlob.size / f.size) * 100).toFixed(1);
    updateProgress(0, 100, `${formatBytes(f.size)} ➔ ${formatBytes(finalBlob.size)} (${savedPercent}%)`);
    updateGlobalProgress(100, 'Selesai!');
    
    downloadBlob(finalBlob, `KiLat_Target_${targetVal}${targetUnit}_${f.name}`);
    showToast(`PDF berhasil dikompres ke ${formatBytes(finalBlob.size)}!`, 'success');
}

// -------------------------------------------------------------
// 2. PDF SIGNATURE (TEMPEL TANDA TANGAN DIGITAL)
// -------------------------------------------------------------
async function executePdfSignature() {
    const f = currentFiles[0];
    if (!f) return;
    
    // Obtain PNG buffer of signature
    let sigBuffer = null;
    const isUploadTab = !document.getElementById('sig-upload-container').classList.contains('hidden');
    
    if (isUploadTab && sigPadState.uploadedBlob) {
        // Read uploaded image and ensure it has transparency or render onto canvas
        const img = new Image();
        const url = URL.createObjectURL(sigPadState.uploadedBlob);
        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = url;
        });
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Optional: auto-whiten background if not transparent
        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
            // If near white, make transparent
            if (d[i] > 220 && d[i+1] > 220 && d[i+2] > 220) {
                d[i+3] = 0;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        
        const blob = await new Promise(r => c.toBlob(r, 'image/png'));
        sigBuffer = await blob.arrayBuffer();
        URL.revokeObjectURL(url);
    } else if (sigPadState.hasDrawn && sigPadState.canvas) {
        const blob = await new Promise(r => sigPadState.canvas.toBlob(r, 'image/png'));
        sigBuffer = await blob.arrayBuffer();
    } else {
        showToast('Silakan gambar tanda tangan atau upload file PNG tanda tangan terlebih dahulu', 'error');
        return;
    }
    
    updateGlobalProgress(30, 'Memuat dokumen PDF...');
    const bytes = await f.arrayBuffer();
    const { PDFDocument } = PDFLib;
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = doc.getPages();
    const totalPages = pages.length;
    
    // Determine page
    const pageChoice = document.getElementById('opt-sig-page')?.value || 'last';
    let targetPageIdx = totalPages - 1;
    if (pageChoice === '1') targetPageIdx = 0;
    else if (pageChoice === 'custom') {
        const customP = parseInt(document.getElementById('opt-sig-page-custom')?.value || '1');
        targetPageIdx = Math.max(0, Math.min(totalPages - 1, customP - 1));
    }
    
    const targetPage = pages[targetPageIdx];
    const { width: pageWidth, height: pageHeight } = targetPage.getSize();
    
    // Embed signature
    updateGlobalProgress(60, 'Menempelkan tanda tangan...');
    const sigImg = await doc.embedPng(sigBuffer);
    
    const sigW = parseInt(document.getElementById('opt-sig-width')?.value || '140');
    const aspect = sigImg.height / sigImg.width;
    const sigH = sigW * aspect;
    const margin = parseInt(document.getElementById('opt-sig-margin')?.value || '80');
    const posPreset = document.getElementById('opt-sig-pos')?.value || 'bottom-right';
    
    let x = pageWidth - sigW - 60;
    let y = margin;
    
    if (posPreset === 'bottom-left') {
        x = 60;
        y = margin;
    } else if (posPreset === 'bottom-center') {
        x = (pageWidth - sigW) / 2;
        y = margin;
    } else if (posPreset === 'mid-right') {
        x = pageWidth - sigW - 60;
        y = (pageHeight / 2) - (sigH / 2);
    }
    
    targetPage.drawImage(sigImg, {
        x: x,
        y: y,
        width: sigW,
        height: sigH
    });
    
    updateGlobalProgress(90, 'Menyimpan PDF...');
    const finalBytes = await doc.save();
    const outBlob = new Blob([finalBytes], { type: 'application/pdf' });
    
    updateProgress(0, 100, 'Tanda tangan tertempel!');
    updateGlobalProgress(100, 'Selesai!');
    downloadBlob(outBlob, `KiLat_Signed_${f.name}`);
    showToast('Tanda tangan berhasil ditempel ke PDF!', 'success');
}

// -------------------------------------------------------------
// 3. THESIS PAGE NUMBERING (ROMAWI + ARAB GABUNGAN)
// -------------------------------------------------------------
async function executeThesisPageNum() {
    const f = currentFiles[0];
    if (!f) return;
    
    const romStart = parseInt(document.getElementById('opt-thesis-rom-start')?.value || '1');
    const romEnd = parseInt(document.getElementById('opt-thesis-rom-end')?.value || '4');
    const romStyle = document.getElementById('opt-thesis-rom-style')?.value || 'lower';
    const romPos = document.getElementById('opt-thesis-rom-pos')?.value || 'bottom-center';
    const skipCover = document.getElementById('opt-thesis-skip-cover')?.checked ?? true;
    
    const numStart = parseInt(document.getElementById('opt-thesis-num-start')?.value || '5');
    const numValInit = parseInt(document.getElementById('opt-thesis-num-val')?.value || '1');
    const numPos = document.getElementById('opt-thesis-num-pos')?.value || 'bottom-center';
    
    const fontSize = parseInt(document.getElementById('opt-thesis-font-size')?.value || '11');
    const fontFam = document.getElementById('opt-thesis-font-fam')?.value || 'TimesRoman';
    
    updateGlobalProgress(30, 'Membaca dokumen naskah...');
    const bytes = await f.arrayBuffer();
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const font = await doc.embedFont(fontFam === 'TimesRoman' ? StandardFonts.TimesRoman : StandardFonts.Helvetica);
    
    const pages = doc.getPages();
    const totalPages = pages.length;
    
    updateGlobalProgress(60, 'Membubuhkan nomor halaman skripsi...');
    
    for (let i = 0; i < totalPages; i++) {
        const pageNum = i + 1;
        const page = pages[i];
        const { width, height } = page.getSize();
        
        let textToDraw = '';
        let posChoice = 'bottom-center';
        
        // Section 1: Roman
        if (pageNum >= romStart && pageNum <= romEnd) {
            if (skipCover && pageNum === 1) {
                continue; // Skip cover
            }
            textToDraw = toRoman(pageNum, romStyle === 'lower');
            posChoice = romPos;
        } 
        // Section 2: Arabic
        else if (pageNum >= numStart) {
            const currentNum = numValInit + (pageNum - numStart);
            textToDraw = String(currentNum);
            posChoice = numPos;
        }
        
        if (textToDraw) {
            const textWidth = font.widthOfTextAtSize(textToDraw, fontSize);
            let x = (width - textWidth) / 2;
            let y = 30; // default bottom
            
            if (posChoice === 'top-right') {
                x = width - textWidth - 50;
                y = height - 35;
            } else if (posChoice === 'bottom-right') {
                x = width - textWidth - 50;
                y = 30;
            } else if (posChoice === 'bottom-center') {
                x = (width - textWidth) / 2;
                y = 30;
            }
            
            page.drawText(textToDraw, {
                x, y,
                size: fontSize,
                font: font,
                color: rgb(0.1, 0.1, 0.1)
            });
        }
    }
    
    updateGlobalProgress(90, 'Menyimpan hasil penomoran...');
    const finalBytes = await doc.save();
    const outBlob = new Blob([finalBytes], { type: 'application/pdf' });
    
    updateProgress(0, 100, 'Selesai!');
    updateGlobalProgress(100, 'Selesai!');
    downloadBlob(outBlob, `KiLat_Skripsi_Numbered_${f.name}`);
    showToast('Nomor halaman skripsi berhasil disisipkan rapi!', 'success');
}

// -------------------------------------------------------------
// 4. WATERMARK PROTEKSI DOKUMEN (KTP/KTM/BERKAS)
// -------------------------------------------------------------
async function executeIdWatermark() {
    let text = document.getElementById('opt-id-wm-text')?.value || 'HANYA UNTUK VERIFIKASI';
    const addDate = document.getElementById('opt-id-wm-date')?.checked ?? true;
    if (addDate) {
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()}`;
        text += ` - ${dateStr}`;
    }
    
    const style = document.getElementById('opt-id-wm-style')?.value || 'diagonal';
    const colorHex = document.getElementById('opt-id-wm-color')?.value || '#dc2626';
    const opacity = parseInt(document.getElementById('opt-id-wm-opacity')?.value || '35') / 100;
    
    const hexToRgb = (hex) => {
        const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return res ? {
            r: parseInt(res[1], 16) / 255,
            g: parseInt(res[2], 16) / 255,
            b: parseInt(res[3], 16) / 255
        } : { r: 0.86, g: 0.15, b: 0.15 };
    };
    const rgbColor = hexToRgb(colorHex);
    
    let processedFiles = [];
    const totalFiles = currentFiles.length;
    
    for (let i = 0; i < totalFiles; i++) {
        if (cancelRequested) break;
        const f = currentFiles[i];
        updateGlobalProgress((i / totalFiles) * 80, `Memberi cap pada ${f.name}...`);
        
        if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
            // PDF processing
            const { PDFDocument, StandardFonts, rgb, degrees } = PDFLib;
            const bytes = await f.arrayBuffer();
            const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
            const font = await doc.embedFont(StandardFonts.HelveticaBold);
            const pages = doc.getPages();
            
            pages.forEach(page => {
                const { width, height } = page.getSize();
                
                if (style === 'diagonal') {
                    const fontSize = Math.max(16, Math.min(32, Math.floor(width / (text.length * 0.45))));
                    const textWidth = font.widthOfTextAtSize(text, fontSize);
                    page.drawText(text, {
                        x: (width - textWidth * 0.7) / 2,
                        y: height / 2,
                        size: fontSize,
                        font,
                        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
                        opacity,
                        rotate: degrees(35)
                    });
                } else if (style === 'tiled') {
                    const fontSize = 14;
                    for (let x = -width; x < width * 2; x += 220) {
                        for (let y = -height; y < height * 2; y += 120) {
                            page.drawText(text, {
                                x, y,
                                size: fontSize,
                                font,
                                color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
                                opacity,
                                rotate: degrees(30)
                            });
                        }
                    }
                } else if (style === 'bottom-bar') {
                    const fontSize = 12;
                    page.drawRectangle({
                        x: 0, y: 0,
                        width: width, height: 35,
                        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
                        opacity: 0.15
                    });
                    page.drawText(text, {
                        x: 20, y: 12,
                        size: fontSize,
                        font,
                        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
                        opacity: Math.min(1.0, opacity + 0.3)
                    });
                }
            });
            
            const outBytes = await doc.save();
            processedFiles.push({
                name: `KiLat_Protected_${f.name}`,
                blob: new Blob([outBytes], { type: 'application/pdf' })
            });
            
        } else {
            // Image processing (Canvas)
            const img = new Image();
            const url = URL.createObjectURL(f);
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = colorHex;
            
            if (style === 'diagonal') {
                const fontSize = Math.max(20, Math.min(60, Math.floor(canvas.width / (text.length * 0.5))));
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(-35 * Math.PI / 180);
                ctx.textAlign = 'center';
                ctx.fillText(text, 0, 0);
            } else if (style === 'tiled') {
                const fontSize = Math.max(14, Math.floor(canvas.width / 35));
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.rotate(-25 * Math.PI / 180);
                for (let x = -canvas.width; x < canvas.width * 2; x += fontSize * 14) {
                    for (let y = -canvas.height; y < canvas.height * 2; y += fontSize * 4) {
                        ctx.fillText(text, x, y);
                    }
                }
            } else if (style === 'bottom-bar') {
                ctx.restore();
                ctx.save();
                const barH = Math.max(40, canvas.height * 0.08);
                ctx.fillStyle = colorHex;
                ctx.globalAlpha = 0.2;
                ctx.fillRect(0, canvas.height - barH, canvas.width, barH);
                ctx.globalAlpha = Math.min(1.0, opacity + 0.4);
                const fontSize = Math.max(14, Math.floor(barH * 0.4));
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(text, canvas.width / 2, canvas.height - barH / 2 + fontSize / 3);
            }
            ctx.restore();
            URL.revokeObjectURL(url);
            
            const outBlob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.92));
            processedFiles.push({
                name: `KiLat_Protected_${f.name.replace(/\.[^/.]+$/, "")}.jpg`,
                blob: outBlob
            });
        }
        updateProgress(i, 100, 'Cap selesai');
    }
    
    if (processedFiles.length > 0) {
        updateGlobalProgress(95, 'Menyimpan file hasil...');
        await createZipDownload(processedFiles, 'KiLat_Protected_Documents.zip');
        showToast('Dokumen berhasil diberi watermark proteksi!', 'success');
    }
}

// -------------------------------------------------------------
// 5. DOCUMENT SCANNER FILTER (FOTO HP KE DOKUMEN BERSIH)
// -------------------------------------------------------------
async function executeDocScanner() {
    const filter = document.getElementById('opt-scanner-filter')?.value || 'magic_bw';
    const outputFormat = document.getElementById('opt-scanner-output')?.value || 'pdf';
    const paperSize = document.getElementById('opt-scanner-paper')?.value || 'A4';
    
    const { PDFDocument } = PDFLib;
    let pdfDoc = outputFormat === 'pdf' ? await PDFDocument.create() : null;
    let processedImages = [];
    const totalFiles = currentFiles.length;
    
    for (let i = 0; i < totalFiles; i++) {
        if (cancelRequested) break;
        const f = currentFiles[i];
        
        updateGlobalProgress((i / totalFiles) * 80, `Memfilter foto ${f.name}...`);
        updateProgress(i, 30, 'Memproses scan...');
        
        const img = new Image();
        const url = URL.createObjectURL(f);
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        const len = d.length;
        
        if (filter === 'magic_bw') {
            // Adaptive threshold & background whitening
            for (let j = 0; j < len; j += 4) {
                const lum = 0.299 * d[j] + 0.587 * d[j+1] + 0.114 * d[j+2];
                if (lum > 175) {
                    // Make paper background pure white
                    d[j] = d[j+1] = d[j+2] = 255;
                } else {
                    // Darken text with high contrast
                    const dark = Math.max(0, Math.min(255, (lum - 35) * 1.6));
                    d[j] = d[j+1] = d[j+2] = dark;
                }
            }
        } else if (filter === 'grayscale') {
            // High contrast smooth grayscale
            for (let j = 0; j < len; j += 4) {
                const lum = 0.299 * d[j] + 0.587 * d[j+1] + 0.114 * d[j+2];
                const enhanced = Math.max(0, Math.min(255, (lum - 20) * 1.25));
                d[j] = d[j+1] = d[j+2] = enhanced;
            }
        } else if (filter === 'color_boost') {
            // Color scan: whiten background while preserving colors
            for (let j = 0; j < len; j += 4) {
                const r = d[j], g = d[j+1], b = d[j+2];
                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
                if (lum > 185 && maxDiff < 25) {
                    // Neutral background
                    d[j] = d[j+1] = d[j+2] = 255;
                } else {
                    // Boost saturation
                    d[j] = Math.min(255, r * 1.15);
                    d[j+1] = Math.min(255, g * 1.15);
                    d[j+2] = Math.min(255, b * 1.15);
                }
            }
        }
        
        ctx.putImageData(imgData, 0, 0);
        URL.revokeObjectURL(url);
        
        const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.90));
        
        if (outputFormat === 'pdf') {
            const imgBuffer = await blob.arrayBuffer();
            const embedded = await pdfDoc.embedJpg(imgBuffer);
            
            let pWidth = embedded.width;
            let pHeight = embedded.height;
            
            if (paperSize === 'A4') {
                pWidth = 595.28;
                pHeight = 841.89;
                const scale = Math.min((pWidth - 40) / embedded.width, (pHeight - 40) / embedded.height);
                const drawW = embedded.width * scale;
                const drawH = embedded.height * scale;
                const page = pdfDoc.addPage([pWidth, pHeight]);
                page.drawImage(embedded, {
                    x: (pWidth - drawW) / 2,
                    y: (pHeight - drawH) / 2,
                    width: drawW,
                    height: drawH
                });
            } else {
                const page = pdfDoc.addPage([pWidth, pHeight]);
                page.drawImage(embedded, { x: 0, y: 0, width: pWidth, height: pHeight });
            }
        } else {
            processedImages.push({
                name: `KiLat_Scan_${f.name.replace(/\.[^/.]+$/, "")}.jpg`,
                blob: blob
            });
        }
        
        updateProgress(i, 100, 'Terscan jernih');
    }
    
    updateGlobalProgress(95, 'Menyimpan dokumen scan...');
    if (outputFormat === 'pdf' && pdfDoc) {
        const finalBytes = await pdfDoc.save();
        downloadBlob(new Blob([finalBytes], { type: 'application/pdf' }), 'KiLat_Scanned_Document.pdf');
        showToast('Dokumen scan berhasil dibuat ke format PDF rapi!', 'success');
    } else if (processedImages.length > 0) {
        await createZipDownload(processedImages, 'KiLat_Scanned_Images.zip');
        showToast('Foto dokumen berhasil dibersihkan!', 'success');
    }
}

// -------------------------------------------------------------
// 6. OCR LOCAL (GAMBAR KE TEKS)
// -------------------------------------------------------------
async function executeOcrTool() {
    const f = currentFiles[0];
    if (!f) return;
    
    if (typeof Tesseract === 'undefined') {
        showToast('Memuat mesin OCR Tesseract...', 'info');
        // Dynamic load fallback
        await new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
            s.onload = res;
            s.onerror = () => rej(new Error('Gagal memuat pustaka OCR'));
            document.head.appendChild(s);
        });
    }
    
    const lang = document.getElementById('opt-ocr-lang')?.value || 'ind+eng';
    updateGlobalProgress(15, 'Mempersiapkan OCR lokal di browser...');
    updateProgress(0, 15, 'Membaca file...');
    
    let imageSource = null;
    let urlToRevoke = null;
    
    if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
        updateGlobalProgress(25, 'Merender halaman 1 PDF ke gambar...');
        const bytes = await f.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
        const page = await pdfDoc.getPage(1);
        const vp = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        imageSource = canvas;
    } else {
        urlToRevoke = URL.createObjectURL(f);
        imageSource = urlToRevoke;
    }
    
    try {
        updateGlobalProgress(40, 'Menjalankan pengenalan teks...');
        
        const worker = await Tesseract.createWorker(lang, 1, {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const pct = Math.floor(m.progress * 100);
                    updateProgress(0, Math.min(95, 30 + Math.floor(pct * 0.65)), `Membaca: ${pct}%`);
                    updateGlobalProgress(Math.min(95, 30 + Math.floor(pct * 0.65)), `Mengenali teks: ${pct}%`);
                }
            }
        });
        
        const ret = await worker.recognize(imageSource);
        await worker.terminate();
        
        if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
        
        const resultText = ret.data.text;
        
        // Populate and reveal result area
        const resultBox = document.getElementById('ocr-result-box');
        const txtArea = document.getElementById('ocr-extracted-text');
        if (resultBox && txtArea) {
            txtArea.value = resultText;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth' });
        }
        
        updateProgress(0, 100, `Selesai (${resultText.length} karakter)`);
        updateGlobalProgress(100, 'Ekstraksi teks selesai!');
        showToast('Teks berhasil diekstrak! Anda bisa langsung menyalinnya.', 'success');
        
    } catch (err) {
        if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
        console.error(err);
        throw err;
    }
}

// Export to window
window.processStudentTool = processStudentTool;
window.setTargetPdfPreset = setTargetPdfPreset;
window.switchSigTab = switchSigTab;
window.initSignaturePad = initSignaturePad;
window.clearSignaturePad = clearSignaturePad;
window.setSigColor = setSigColor;
window.setWatermarkPreset = setWatermarkPreset;
window.setScannerPreset = setScannerPreset;
window.copyOcrResult = copyOcrResult;
window.downloadOcrResult = downloadOcrResult;
