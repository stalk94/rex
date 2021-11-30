function Tool() {
    return(
        <div class="page-wrapper">
            <div class="circle-wrapper">
                <div class="success circle"></div>
                <div class="icon">
                    <i class="fa fa-check"></i>
                </div>
            </div>
            <div class="circle-wrapper">
                <div class="warning circle"></div>
                <div class="icon">
                    <i class="fa fa-exclamation"></i>
                </div>
            </div>
            <div class="circle-wrapper">
                <div class="error circle"></div>
                <div class="icon">
                    <i class="fa fa-times"></i>
                </div>
            </div>
        </div>
    );
}

<div class="container">
        <div class="top-device">  
            <div class="ring">
                <span></span>
            </div>

            <svg class="progress" data-progress="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px" viewBox="0 0 80 80" xml:space="preserve"
        >
            <path class="track" 
                transform="translate(-10 8) rotate(45 50 50)" 
                d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
            </path>
            <text class="display" x="50%" y="60%">0%</text>
            <path class="fill" 
                transform="translate(-10 8) rotate(45 50 50)" 
                d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
            </path>
            
            <script>
                $(document).ready(()=> {
                    let max = 150.72259521484375;
                    $.each($('.progress'), ( index, value )=> {
                        percent = $(value).data('progress');
                        $(value).children($('.fill')).attr('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                        $(value).children($('.display')).text(percent + '%');
                    });
                });
            </script>
        </svg>
        </div>
        

        <div class="skills">
            <div class="skills_label">
            
            </div>
            <div class="bar">
                <h2>10</h2>
            </div>
        </div>
        <div class="skills">
            <div class="skills_label">
                <h2>21</h2>
            </div>
            <div class="bar">
                
            </div>
        </div>
        <div class="skills">
            <div class="skills_label">
            
            </div>
            <div class="bar">
                <h2>100</h2>
            </div>
        </div>
        <div class="skills">
            <div class="skills_label">
            
            </div>
            <div class="bar">
                <h2>1</h2>
            </div>
        </div>
    </div>