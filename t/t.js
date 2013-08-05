function forceWide() {
    $('body').addClass('force-wide').removeClass('force-narrow');
    $(window).trigger('resize');
    }

function forceNarrow() {
    $('body').addClass('force-narrow').removeClass('force-wide');
    $(window).trigger('resize');
    }

function resetWidth() {
    $('body').removeClass('force-wide').removeClass('force-narrow');
    $(window).trigger('resize');
    }

function cleanText($el) {
    return $el.get(0).innerText.replace(/\s+/g, ' ').replace(/^ | $/g, '');
    }
