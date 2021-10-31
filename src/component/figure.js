import React from "react";


function Figure(props) {
  return (
    <svg className="figure" width={672} height={702} fill="none" {...props}>
      <path
        d="M65.783 327.55l-.258.135.258.148v-.283zM56.563 311.424l-.381-.222v.443l.381-.221zM65.906 294.793l-.64.369.64.369v-.738zM37.582 311.35l-.123.074.123.074v-.148zM56.735 278.901l-.64-.369v.738l.64-.369zM66.005 262.111l-.922.529.922.529v-1.058zM28.288 295.163l-.197-.111v.221l.197-.11zM37.668 278.68l-.382.221.382.222v-.443zM56.834 246.379l-.775-.455v.898l.775-.443zM66.03 229.527l-1.01.591 1.01.578v-1.169zM28.325 262.64l-.247-.148v.283l.247-.135zM37.668 246.157l-.382.222.382.209v-.431zM56.834 213.844l-.775-.443v.898l.775-.455zM66.005 197.054l-.922.529.922.529v-1.058zM28.238 230.117l-.122-.073v.135l.122-.062zM37.63 213.709l-.257.135.258.148v-.283zM56.65 181.321l-.505-.295v.591l.504-.296zM65.87 164.765l-.517.295.516.295v-.59zM37.57 181.272l-.087.05.087.049v-.099zM270.499 490.273l-.074.049.074.049v-.098zM289.529 490.322l-.43-.246v.492l.43-.246zM261.549 474.061l-.677-.394v.787l.677-.393zM299.18 473.114l-1.636.947 1.636.947v-1.894zM317.522 506.583l-.185-.11v.221l.185-.111zM271.126 456.668l-1.943 1.131 1.943 1.12v-2.251zM290.943 457.8l-2.545-1.477v2.94l2.545-1.463zM318.837 474.061l-2.152-1.255v2.497l2.152-1.242zM327.259 489.51l-1.415.812 1.415.812v-1.624zM242.395 473.938l-.209.123.209.11v-.233zM242.985 440.382l-1.992 1.156 1.992 1.144v-2.3zM263.011 441.538l-2.876-1.673v3.334l2.876-1.661zM300.102 438.98l-4.413 2.558 4.413 2.546v-5.104zM320.866 441.538l-5.2-3.013v6.015l5.2-3.002zM328.107 455.512l-3.959 2.287 3.959 2.276v-4.563zM347.125 490.322l-2.361-1.365v2.73l2.361-1.365zM355.522 505.575l-1.759 1.008 1.759 1.009v-2.017zM345.736 522.844l-.27-.147v.307l.27-.16zM233.335 457.799l-.59-.344v.689l.59-.345zM234.638 425.265l-2.545-1.476v2.952l2.545-1.476zM272.072 422.497l-4.794 2.768 4.794 2.78v-5.548zM293.119 425.265l-5.815-3.346v6.704l5.815-3.358zM329.287 420.935l-7.511 4.33 7.511 4.342v-8.672zM348.773 457.8l-4.832-2.793v5.585l4.832-2.792zM356.26 471.76l-3.971 2.301 3.971 2.288v-4.589zM375.671 506.583l-2.95-1.697v3.407l2.95-1.71zM214.181 457.787l-.012.012h.012v-.012zM243.735 406.556l-4.241 2.448 4.241 2.447v-4.895zM264.831 409.004l-5.606-3.235v6.482l5.606-3.247zM301.233 404.489l-7.819 4.515 7.819 4.526v-9.041zM323.153 409.004l-8.631-4.982v9.976l8.631-4.994zM351.194 425.265l-8.458-4.884v9.779l8.458-4.895zM357.317 437.405l-7.143 4.133 7.143 4.121v-8.254zM377.233 474.061l-5.286-3.063v6.126l5.286-3.063zM384.744 487.444l-4.966 2.878 4.966 2.878v-5.756zM383.958 521.332l-2.619 1.512 2.619 1.513v-3.025zM374.282 539.106l-.861-.492v.996l.861-.504zM205.047 441.538l-.394-.234v.456l.394-.222zM214.685 424.379l-1.537.886 1.537.898v-1.784zM215.288 390.811l-3.344 1.931 3.344 1.931v-3.862zM235.965 392.742l-4.536-2.62v5.24l4.536-2.62zM272.957 388.449l-7.437 4.293 7.437 4.293v-8.586zM294.988 392.742l-8.618-4.981v9.963l8.618-4.982zM330.246 386.74l-10.388 6.002 10.388 6.003V386.74zM352.953 392.742l-11.101-6.421v12.842l11.101-6.421zM358.374 403.05l-10.314 5.953 10.314 5.954V403.05zM379.273 441.538l-8.359-4.834v9.656l8.359-4.822zM385.605 453.445l-7.536 4.354 7.536 4.355v-8.709zM406.492 490.322l-6.958-4.022v8.044l6.958-4.022zM413.511 502.647l-6.81 3.936 6.81 3.936v-7.872zM404.869 522.844l-4.512-2.607v5.215l4.512-2.608zM383.306 554.998l-.64.381.64.369v-.75zM206.092 409.004l-1.956-1.132v2.263l1.956-1.131zM207.149 376.481l-3.541-2.042v4.084l3.541-2.042zM244.436 372.828l-6.331 3.653 6.331 3.653v-7.306zM266.294 376.481l-7.806-4.502v9.004l7.806-4.502zM302.02 370.601l-10.167 5.88 10.167 5.867v-11.747zM324.751 376.481l-11.028-6.372v12.744l11.028-6.372zM358.977 369.47l-12.134 7.011 12.134 7.011V369.47zM381.179 409.004l-11.212-6.471v12.941l11.212-6.47zM386.625 419.139l-10.609 6.126 10.609 6.138v-12.264zM408.127 457.799l-9.405-5.436v10.861l9.405-5.425zM414.286 468.796l-9.122 5.265 9.122 5.264v-10.529zM436.206 506.583l-9.294-5.363v10.726l9.294-5.363zM412.663 536.646l-4.266 2.46 4.266 2.472v-4.932zM403.295 555.379l-2.152-1.242v2.485l2.152-1.243zM186.335 408.45l-.959.553.959.554v-1.107zM215.816 357.366l-4.93 2.854 4.93 2.841v-5.695zM237.133 360.22l-6.294-3.641v7.269l6.294-3.628zM273.56 354.881l-9.233 5.339 9.233 5.326v-10.665zM296.192 360.22l-10.412-6.027v12.042l10.412-6.015zM330.762 353.319l-11.949 6.901 11.949 6.9v-13.801zM353.789 360.22l-12.356-7.147v14.281l12.356-7.134zM382.212 376.481l-12.761-7.368v14.736l12.761-7.368zM387.265 385.51l-12.528 7.232 12.528 7.233V385.51zM409.836 425.265l-11.962-6.913v13.826l11.962-6.913zM415.134 434.785l-11.679 6.753 11.679 6.741v-13.494zM437.681 474.061l-11.507-6.642v13.284l11.507-6.642zM443.336 483.495l-11.814 6.827 11.814 6.815v-13.642zM442.525 517.432l-9.38 5.413 9.38 5.424v-10.837zM434.362 539.106l-6.528-3.764v7.54l6.528-3.776zM411.876 570.546l-1.894 1.095 1.894 1.082v-2.177zM402.115 587.902l-.381-.222v.443l.381-.221zM177.435 392.742l-1.205-.689v1.378l1.205-.689zM186.828 375.067l-2.436 1.414 2.436 1.415v-2.829zM187.27 341.794l-3.749 2.164 3.749 2.153v-4.317zM208.12 343.958l-5.003-2.89v5.781l5.003-2.891zM244.903 339.493l-7.733 4.465 7.733 4.453v-8.918zM267.216 343.958l-9.183-5.313v10.615l9.183-5.302zM302.376 337.464l-11.236 6.495 11.236 6.482v-12.977zM325.39 343.959l-11.986-6.926v13.839l11.986-6.913zM359.173 336.603l-12.711 7.355 12.711 7.344v-14.699zM382.335 343.958l-12.946-7.478v14.945l12.946-7.467zM387.473 352.606l-13.166 7.614 13.166 7.601v-15.215zM410.708 392.742l-13.277-7.663v15.326l13.277-7.663zM415.675 401.316l-13.302 7.687 13.302 7.688v-15.375zM439.132 441.538l-13.683-7.909v15.806l13.683-7.897zM444.037 449.767l-13.916 8.033 13.916 8.032v-16.065zM467.653 490.322l-14.236-8.229v16.446l14.236-8.217zM472.362 498.244l-14.433 8.339 14.433 8.34v-16.679zM466.092 522.845l-11.888-6.864v13.739l11.888-6.875zM441.48 551.763l-6.245 3.616 6.245 3.604v-7.22zM432.505 571.64l-3.737-2.164v4.317l3.737-2.153zM411.323 604.015l-.246.148.246.148v-.296zM158.023 392.472l-.467.27.467.259v-.529zM178.308 360.22l-2.52-1.464v2.915l2.52-1.451zM179.168 327.685l-3.798-2.19v4.392l3.798-2.202zM216.271 324.044l-6.307 3.641 6.307 3.653v-7.294zM237.969 327.685l-7.548-4.354v8.721l7.548-4.367zM273.855 321.83l-10.143 5.855 10.143 5.867V321.83zM296.709 327.685l-11.188-6.458v12.928l11.188-6.47zM330.898 320.563l-12.331 7.122 12.331 7.122v-14.244zM353.924 327.685l-12.552-7.245v14.502l12.552-7.257zM387.351 320.305l-12.786 7.38 12.786 7.393v-14.773zM410.832 360.22l-13.462-7.774v15.535l13.462-7.761zM415.835 368.523l-13.781 7.958 13.781 7.958v-15.916zM439.709 409.004l-14.555-8.402v16.815l14.555-8.413zM444.442 416.531l-15.133 8.734 15.133 8.745v-17.479zM468.809 457.8l-15.97-9.238v18.463l15.97-9.225zM472.964 464.676l-16.24 9.385 16.24 9.385v-18.77zM497.49 506.583l-16.756-9.68v19.361l16.756-9.681zM471.378 532.488l-11.482 6.618 11.482 6.63v-13.248zM463.867 555.379l-8.557-4.945v9.878l8.557-4.933zM440.496 585.983l-3.307 1.919 3.307 1.919v-3.838zM430.993 604.163l-1.476-.849v1.698l1.476-.849zM148.987 376.481l-.762-.443v.886l.762-.443zM158.417 359.248l-1.673.972 1.673.959v-1.931zM187.7 308.496l-5.065 2.928 5.065 2.927v-5.855zM209.005 311.424l-6.331-3.653v7.306l6.331-3.653zM245.235 306.38l-8.729 5.044 8.729 5.043V306.38zM267.733 311.424l-9.958-5.745v11.489l9.958-5.744zM302.426 304.843l-11.397 6.581 11.397 6.593v-13.174zM325.329 311.424l-11.888-6.864v13.74l11.888-6.876zM358.927 304.523l-11.961 6.901 11.961 6.9v-13.801zM381.609 311.424l-11.851-6.852v13.703l11.851-6.851zM410.278 327.685l-12.625-7.282v14.576l12.625-7.294zM415.651 336.32l-13.216 7.638 13.216 7.627V336.32zM439.562 376.481l-14.322-8.278v16.556l14.322-8.278zM444.381 384.095l-14.962 8.647 14.962 8.648v-17.295zM469.325 425.265l-16.744-9.668v19.348l16.744-9.68zM473.357 431.464l-17.432 10.074 17.432 10.062v-20.136zM498.437 474.061l-18.183-10.505v20.997l18.183-10.492zM501.928 479.522l-18.687 10.8 18.687 10.8v-21.6zM501.264 513.213l-16.67 9.631 16.67 9.632v-19.263zM495.548 539.106l-13.843-7.983v15.978l13.843-7.995zM470.149 567.139l-7.794 4.502 7.794 4.502v-9.004zM461.531 587.902l-5.053-2.928v5.843l5.053-2.915zM439.832 619.662l-1.316.762 1.316.763v-1.525zM129.797 376.333l-.258.148.258.148v-.296zM149.725 343.958l-1.869-1.082v2.153l1.869-1.071zM158.823 326.037l-2.865 1.648 2.865 1.661v-3.309zM159.191 292.875l-3.97 2.287 3.97 2.301v-4.588zM179.955 295.163l-4.979-2.879v5.757l4.979-2.878zM216.578 290.993l-7.228 4.169 7.228 4.17v-8.339zM238.437 295.162l-8.25-4.76v9.521l8.25-4.761zM273.843 289.32l-10.106 5.842 10.106 5.843V289.32zM296.353 295.162l-10.659-6.15v12.301l10.659-6.151zM330.455 288.791l-11.028 6.372 11.028 6.371v-12.743zM352.817 295.162l-10.892-6.297v12.595l10.892-6.298zM386.601 289.086l-10.524 6.076 10.524 6.077v-12.153zM408.619 295.163l-10.143-5.856v11.711l10.143-5.855zM415.048 304.843l-11.408 6.581 11.408 6.593v-13.174zM438.935 343.959l-13.388-7.737v15.461l13.388-7.724zM444.086 352.089l-14.064 8.131 14.064 8.118v-16.249zM468.735 392.742l-15.859-9.164v18.328l15.859-9.164zM473.197 399.212l-16.953 9.791 16.953 9.792v-19.583zM498.941 441.538l-18.932-10.947v21.882l18.932-10.935zM502.26 446.422l-19.682 11.377 19.682 11.366v-22.743zM527.979 490.322l-20.261-11.71v23.42l20.261-11.71zM530.659 494.787l-20.42 11.796 20.42 11.796v-23.592zM526.97 522.845l-18.748-10.837v21.673l18.748-10.836zM500.109 547.74l-13.216 7.639 13.216 7.626V547.74zM492.953 571.641l-9.958-5.757v11.513l9.958-5.756zM469.042 601.58l-4.487 2.583 4.487 2.596v-5.179zM459.896 620.424l-2.594-1.5v3.001l2.594-1.501zM120.675 360.22l-.517-.295v.59l.517-.295zM130.104 343.27l-1.181.689 1.181.676v-1.365zM150.549 311.424l-3.098-1.784v3.579l3.098-1.795zM151.065 278.901l-3.885-2.238v4.477l3.885-2.239zM187.922 275.605l-5.704 3.296 5.704 3.297v-6.593zM209.239 278.901l-6.675-3.862v7.725l6.675-3.863zM245.112 274.079l-8.359 4.822 8.359 4.822v-9.644zM267.118 278.901l-9.036-5.215v10.431l9.036-5.216zM301.811 273.378l-9.552 5.523 9.552 5.523v-11.046zM323.89 278.901l-9.736-5.621v11.243l9.736-5.622zM358.018 273.563l-9.245 5.338 9.245 5.339v-10.677zM379.778 278.901l-9.11-5.264v10.517l9.11-5.253zM414.028 274.079l-8.348 4.822 8.348 4.822v-9.644zM437.435 311.424l-11.138-6.434v12.867l11.138-6.433zM443.57 320.452l-12.527 7.233 12.527 7.245v-14.478zM467.727 360.22l-14.347-8.291v16.581l14.347-8.29zM472.681 367.588l-15.392 8.893 15.392 8.893v-17.786zM498.252 409.003l-17.899-10.344v20.689l17.899-10.345zM502.088 414.207l-19.154 11.058 19.154 11.058v-22.116zM528.421 457.8l-20.924-12.092v24.171l20.924-12.079zM530.904 461.834l-21.157 12.227 21.157 12.214v-24.441zM556.856 506.583l-21.354-12.337v24.675l21.354-12.338zM529.847 528.736l-17.973 10.37 17.973 10.381v-20.751zM524.659 555.379l-15.281-8.832v17.652l15.281-8.82zM498.707 582.699l-9.011 5.203 9.011 5.203v-10.406zM490.482 604.163l-6.245-3.604v7.208l6.245-3.604zM468.219 635.517l-2.017 1.168 2.017 1.181v-2.349zM458.506 652.947l-.516-.295v.602l.516-.307zM101.645 360.072l-.246.148.246.147v-.295zM121.265 327.685l-1.402-.812v1.636l1.402-.824zM130.461 310.12l-2.251 1.304 2.251 1.304v-2.608zM159.339 260.094l-4.414 2.546 4.414 2.546v-5.092zM180.053 262.64l-5.126-2.964v5.928l5.126-2.964zM216.394 258.778l-6.675 3.862 6.675 3.862v-7.724zM237.785 262.64l-7.265-4.207v8.402l7.265-4.195zM273.203 257.904l-8.175 4.736 8.175 4.723v-9.459zM294.791 262.64l-8.323-4.81v9.607l8.323-4.797zM329.509 257.904l-8.188 4.736 8.188 4.723v-9.459zM350.826 262.64l-7.905-4.576v9.139l7.905-4.563zM385.543 258.384l-7.364 4.256 7.364 4.256v-8.512zM406.492 262.64l-6.946-4.022v8.032l6.946-4.01zM435.456 278.901l-8.175-4.723v9.447l8.175-4.724zM442.611 289.603l-9.638 5.559 9.638 5.56v-11.119zM466.46 327.685l-12.453-7.184v14.38l12.453-7.196zM472.079 336.111l-13.585 7.848 13.585 7.835v-15.683zM496.863 376.481l-15.822-9.139v18.278l15.822-9.139zM501.412 382.84l-17.138 9.902 17.138 9.902V382.84zM527.671 425.265l-19.805-11.427v22.866l19.805-11.439zM530.83 429.447l-20.924 12.091 20.924 12.079v-24.17zM557.152 474.061l-21.785-12.584v25.167l21.785-12.583zM559.327 477.64l-21.944 12.682 21.944 12.682V477.64zM558.91 510.888l-20.703 11.957 20.703 11.956v-23.913zM555.308 539.106l-19.031-10.985v21.981l19.031-10.996zM528.47 563.633l-13.855 8.008 13.855 7.995v-16.003zM521.721 587.902l-10.88-6.286v12.571l10.88-6.285zM497.601 617.128l-5.704 3.296 5.704 3.297v-6.593zM488.565 636.686l-3.369-1.932v3.875l3.369-1.943zM467.555 669.208l-.012.012h.012v-.012zM92.473 343.958l-.455-.27v.529l.455-.259zM101.865 327.168l-.922.517.922.529v-1.046zM121.855 295.163l-2.288-1.329v2.657l2.288-1.328zM130.719 277.155l-3.024 1.746 3.024 1.747v-3.493zM130.793 244.497l-3.258 1.882 3.258 1.882v-3.764zM151.065 246.379l-3.885-2.251v4.489l3.885-2.238zM187.725 243.414l-5.127 2.965 5.127 2.952v-5.917zM208.6 246.379l-5.717-3.309v6.605l5.717-3.296zM244.522 242.578l-6.589 3.801 6.589 3.801v-7.602zM265.643 246.379l-6.823-3.949v7.885l6.823-3.936zM300.926 242.406l-6.885 3.973 6.885 3.96v-7.933zM321.886 246.379l-6.737-3.9v7.787l6.737-3.887zM357.034 242.738l-6.294 3.641 6.294 3.628v-7.269zM377.7 246.379l-5.987-3.469v6.925l5.987-3.456zM413.069 243.218l-5.471 3.161 5.471 3.161v-6.322zM433.673 246.379l-5.495-3.174v6.347l5.495-3.173zM441.652 258.728l-6.774 3.912 6.774 3.911v-7.823zM464.494 295.162l-9.491-5.486v10.972l9.491-5.486zM471.181 305.126l-10.904 6.298 10.904 6.31v-12.608zM495.461 343.959l-13.707-7.922v15.831l13.707-7.909zM500.625 351.696l-14.752 8.524 14.752 8.524v-17.048zM526.061 392.742l-17.384-10.049v20.099l17.384-10.05zM530.105 398.179l-18.747 10.824 18.747 10.825v-21.649zM556.721 441.538l-21.145-12.226v24.441l21.145-12.215zM559.291 445.179l-21.846 12.62 21.846 12.608v-25.228zM585.415 490.322l-21.957-12.682v25.364l21.957-12.682zM587.333 494.16l-21.515 12.423 21.515 12.436V494.16zM584.702 522.845l-20.887-12.055v24.121l20.887-12.066zM557.815 545.318l-17.407 10.061 17.407 10.05v-20.111zM552.517 571.641l-14.839-8.574v17.135l14.839-8.561zM527.007 598.702l-9.454 5.461 9.454 5.462v-10.923zM519.262 620.424l-7.192-4.157v8.315l7.192-4.158zM496.519 651.532l-2.46 1.415 2.46 1.427v-2.842zM486.832 669.22l-.775-.455v.898l.775-.443zM73.492 343.811l-.259.148.259.135v-.283zM92.928 311.424l-1.131-.652v1.304l1.131-.652zM102.124 294.191l-1.685.972 1.685.984v-1.956zM122.212 262.64l-2.828-1.636v3.26l2.828-1.624zM122.249 230.117l-2.889-1.672v3.333l2.889-1.661zM159.155 227.866l-3.873 2.251 3.873 2.239v-4.49zM179.5 230.118l-4.302-2.497v4.981l4.302-2.484zM215.89 227.129l-5.164 2.989 5.164 2.976v-5.965zM236.581 230.117l-5.459-3.148v6.285l5.459-3.137zM272.404 226.772l-5.778 3.345 5.778 3.334v-6.679zM293.021 230.117l-5.668-3.284v6.556l5.668-3.272zM328.599 226.956l-5.459 3.162 5.459 3.148v-6.31zM349.019 230.118l-5.201-3.014v6.015l5.201-3.001zM384.671 227.374l-4.733 2.743 4.733 2.731v-5.474zM404.82 230.117l-4.438-2.57v5.129l4.438-2.559zM440.914 227.473l-4.561 2.645 4.561 2.632v-5.277zM462.662 262.64l-6.749-3.899v7.798l6.749-3.899zM470.247 274.215l-8.101 4.686 8.101 4.674v-9.36zM493.519 311.424l-10.806-6.237v12.473l10.806-6.236zM499.813 320.575l-12.33 7.11 12.33 7.122v-14.232zM524.167 360.22l-14.543-8.414v16.815l14.543-8.401zM529.073 367.44l-15.65 9.041 15.65 9.041V367.44zM555 409.004l-18.564-10.714v21.44L555 409.004zM558.639 413.764l-19.904 11.501 19.904 11.501v-23.002zM585.23 457.8l-21.673-12.522v25.043L585.23 457.8zM587.406 461.502l-21.723 12.559 21.723 12.546v-25.105zM612.891 506.583l-20.948-12.103v24.207l20.948-12.104zM586.571 527.998l-19.228 11.108 19.228 11.119v-22.227zM582.427 555.379l-17.469-10.098v20.185l17.469-10.087zM556.168 580.706l-12.466 7.196 12.466 7.195v-14.391zM549.443 604.163l-10.228-5.904v11.808l10.228-5.904zM525.79 633.34l-5.802 3.345 5.802 3.359v-6.704zM516.779 652.947l-3.467-1.993v3.998l3.467-2.005zM495.757 685.383l-.16.098.16.086v-.184zM64.32 327.685l-.454-.258v.529l.455-.271zM73.664 310.981l-.775.443.775.455v-.898zM93.334 278.901l-1.747-1.008v2.017l1.746-1.009zM102.283 261.385l-2.177 1.255 2.177 1.255v-2.51zM130.707 212.134l-2.976 1.71 2.976 1.722v-3.432zM150.684 213.844l-3.307-1.907v3.813l3.307-1.906zM187.307 211.618l-3.86 2.226 3.86 2.239v-4.465zM207.555 213.844l-4.155-2.399v4.798l4.155-2.399zM243.833 211.236l-4.524 2.608 4.524 2.62v-5.228zM264.13 213.844l-4.561-2.632v5.276l4.561-2.644zM300.127 211.249l-4.5 2.595 4.5 2.608v-5.203zM320.301 213.844l-4.352-2.509v5.03l4.352-2.521zM356.284 211.507l-4.057 2.337 4.057 2.349v-4.686zM376.225 213.844l-3.774-2.177v4.366l3.774-2.189zM412.405 211.827l-3.491 2.017 3.491 2.017v-4.034zM432.382 213.844l-3.553-2.054v4.12l3.553-2.066zM461.346 230.117l-4.77-2.767v5.523l4.77-2.756zM469.436 243.094l-5.668 3.285 5.668 3.272v-6.557zM491.687 278.901l-8.052-4.662v9.312l8.052-4.65zM498.781 289.836l-9.233 5.327 9.233 5.326v-10.653zM522.397 327.685l-11.888-6.864v13.74l11.888-6.876zM528.175 336.455l-12.97 7.504 12.97 7.491v-14.995zM552.726 376.481l-15.158-8.758v17.504l15.158-8.746zM557.557 383.123l-16.645 9.619 16.645 9.619v-19.238zM583.78 425.265l-19.51-11.268v22.535l19.51-11.267zM587.025 429.631l-20.592 11.907 20.592 11.895v-23.802zM612.977 474.061l-21.071-12.178v24.343l21.071-12.165zM615.301 478.218l-20.949 12.104 20.949 12.104v-24.208zM614.846 511.528l-19.596 11.317 19.596 11.316v-22.633zM611.367 539.106l-18.65-10.763v21.538l18.65-10.775zM585.169 562.956l-15.035 8.684 15.035 8.685v-17.369zM579.182 587.902l-12.613-7.294v14.576l12.613-7.282zM554.803 615.578l-8.396 4.846 8.396 4.847v-9.693zM546.727 636.685l-6.16-3.554v7.122l6.16-3.568zM524.573 667.966l-2.165 1.254 2.165 1.255v-2.509zM514.984 685.481l-.775-.455v.898l.775-.443zM64.628 295.162l-.91-.528v1.057l.91-.529zM73.836 278.163l-1.291.738 1.29.738v-1.476zM93.53 246.379l-2.029-1.181v2.349l2.03-1.168zM102.333 228.777l-2.312 1.34 2.312 1.329v-2.669zM102.234 196.414l-2.029 1.169 2.029 1.168v-2.337zM121.966 197.583l-2.46-1.415v2.829l2.46-1.414zM158.823 195.922l-2.865 1.661 2.865 1.66v-3.321zM178.64 197.583l-3.012-1.735v3.469l3.012-1.734zM215.263 195.688l-3.283 1.895 3.283 1.894v-3.789zM235.216 197.583l-3.418-1.968v3.936l3.418-1.968zM271.617 195.615l-3.417 1.968 3.417 1.968v-3.936zM291.509 197.583l-3.393-1.968v3.936l3.393-1.968zM327.861 195.701l-3.245 1.882 3.245 1.882v-3.764zM347.678 197.583l-3.184-1.845v3.69l3.184-1.845zM384.031 195.947l-2.827 1.636 2.827 1.636v-3.272zM403.652 197.583l-2.692-1.55v3.112l2.692-1.562zM440.398 195.848l-3 1.735 3 1.734v-3.469zM460.388 197.583l-3.332-1.919v3.85l3.332-1.931zM468.956 211.421l-4.204 2.423 4.204 2.435v-4.858zM490.224 246.379l-5.864-3.395v6.777l5.864-3.382zM497.982 258.692l-6.835 3.948 6.835 3.936v-7.884zM520.405 295.162l-8.9-5.141v10.283l8.9-5.142zM527.179 305.667l-9.97 5.757 9.97 5.756v-11.513zM550.869 343.959l-12.367-7.147v14.281l12.367-7.134zM556.439 352.532l-13.302 7.688 13.302 7.688v-15.376zM581.456 392.742l-16.018-9.262v18.525l16.018-9.263zM586.005 398.88l-17.531 10.124 17.531 10.123V398.88zM612.203 441.538l-19.916-11.513v23.014l19.916-11.501zM615.129 445.979L594.684 457.8l20.445 11.808v-23.629zM640.466 490.322l-20.075-11.599v23.198l20.075-11.599zM642.888 495.451l-19.276 11.132 19.276 11.144v-22.276zM639.483 522.844l-18.601-10.738v21.489l18.601-10.751zM613.715 546.019l-16.203 9.36 16.203 9.349v-18.709zM608.54 571.64l-14.409-8.327v16.655l14.409-8.328zM583.583 598.234l-10.265 5.929 10.265 5.929v-11.858zM576.317 620.424l-8.31-4.797v9.594l8.31-4.797zM553.377 650.597l-4.093 2.35 4.093 2.361v-4.711zM544.255 669.22l-2.447-1.414v2.816l2.447-1.402zM64.874 262.64l-1.28-.738v1.464l1.28-.726zM73.922 245.469l-1.562.91 1.562.898v-1.808zM93.53 213.844l-2.029-1.169v2.35l2.03-1.181zM93.248 181.321l-1.611-.922v1.845l1.61-.923zM130.387 180.153l-2.029 1.168 2.029 1.169v-2.337zM149.909 181.321l-2.152-1.242v2.485l2.152-1.243zM186.741 180.079l-2.164 1.242 2.164 1.243v-2.485zM206.276 181.321l-2.238-1.291v2.583l2.238-1.292zM243.084 180.005l-2.275 1.316 2.275 1.317v-2.633zM262.606 181.321l-2.263-1.303v2.607l2.263-1.304zM299.389 180.018l-2.275 1.303 2.275 1.304v-2.607zM318.813 181.321l-2.116-1.23v2.461l2.116-1.231zM355.645 180.091l-2.128 1.23 2.128 1.231v-2.461zM375.02 181.321l-1.968-1.144v2.288l1.968-1.144zM411.901 180.177l-1.98 1.144 1.98 1.144v-2.288zM431.46 181.321l-2.176-1.254v2.509l2.176-1.255zM468.538 179.612l-2.962 1.709 2.962 1.71v-3.419zM489.253 213.844l-4.401-2.546v5.092l4.401-2.546zM497.466 227.067l-5.287 3.05 5.287 3.039v-6.089zM518.955 262.64l-6.725-3.887v7.762l6.725-3.875zM526.368 274.547l-7.536 4.354 7.536 4.355v-8.709zM548.828 311.424l-9.306-5.376v10.763l9.306-5.387zM555.492 321.658l-10.45 6.027 10.45 6.039v-12.066zM579.047 360.22l-12.405-7.171v14.33l12.405-7.159zM584.702 368.596l-13.634 7.885 13.634 7.872v-15.757zM610.076 409.004l-16.72-9.656v19.311l16.72-9.655zM614.354 414.809l-18.109 10.456 18.109 10.467v-20.923zM640.208 457.799l-19.682-11.377v22.743l19.682-11.366zM643.035 462.67l-19.706 11.391 19.706 11.378V462.67zM667.439 506.583l-18.306-10.578v21.157l18.306-10.579zM641.904 529.683l-16.313 9.423 16.313 9.434v-18.857zM636.974 555.379l-14.838-8.573v17.134l14.838-8.561zM612.104 581.321l-11.383 6.581 11.383 6.581v-13.162zM605.466 604.163l-9.81-5.67v11.341l9.81-5.671zM582.206 633.143l-6.134 3.542 6.134 3.555v-7.097zM573.478 652.947l-4.045-2.337v4.686l4.045-2.349zM552.357 684.866l-1.046.616 1.046.602v-1.218zM64.96 230.117l-1.415-.824v1.624l1.415-.8zM73.934 212.922l-1.599.922 1.6.935v-1.857zM102.001 164.297l-1.328.763 1.328.763v-1.526zM121.302 165.06l-1.464-.849v1.698l1.464-.849zM158.355 164.211l-1.476.849 1.476.849v-1.698zM177.595 165.06l-1.451-.836v1.673l1.451-.837zM214.611 164.297l-1.316.763 1.316.75v-1.513zM233.814 165.06l-1.316-.763v1.513l1.316-.75zM270.904 164.31l-1.291.75 1.291.75v-1.5zM290.107 165.06l-1.291-.75v1.5l1.291-.75zM327.259 164.236l-1.427.824 1.427.812v-1.636zM346.511 165.06l-1.439-.824v1.648l1.439-.824zM383.564 164.236l-1.426.824 1.426.824v-1.648zM402.841 165.06l-1.476-.849v1.698l1.476-.849zM440.078 163.879l-2.041 1.181 2.041 1.169v-2.35zM459.81 165.06l-2.472-1.427v2.854l2.472-1.427zM488.565 181.322l-3.369-1.944v3.887l3.369-1.943zM497.023 195.295l-3.971 2.288 3.971 2.288v-4.576zM518.057 230.118l-5.384-3.113v6.212l5.384-3.099zM525.852 242.91l-5.987 3.469 5.987 3.456v-6.925zM547.329 278.901l-7.057-4.083v8.155l7.057-4.072zM554.545 290.759l-7.61 4.403 7.61 4.404v-8.807zM577.067 327.685l-9.441-5.449v10.91l9.441-5.461zM583.632 337.931l-10.413 6.027 10.413 6.015v-12.042zM607.285 376.481l-12.527-7.233v14.466l12.527-7.233zM613.039 384.562l-14.175 8.18 14.175 8.18v-16.36zM638.585 425.265l-17.248-9.964v19.939l17.248-9.975zM642.593 430.911l-18.392 10.627 18.392 10.616v-21.243zM667.869 474.061l-18.945-10.96v21.907l18.945-10.947zM670.782 479.645l-18.489 10.677 18.489 10.677v-21.354zM670.045 513.435l-16.277 9.409 16.277 9.41v-18.819zM665.189 539.106l-14.925-8.623v17.245l14.925-8.622zM640.454 564.74l-11.95 6.9 11.95 6.889V564.74zM633.852 587.902l-10.155-5.868v11.735l10.155-5.867zM610.728 616.242l-7.254 4.182 7.254 4.195v-8.377zM602.663 636.685l-5.606-3.235v6.483l5.606-3.248zM580.927 667.892l-2.299 1.328 2.299 1.316v-2.644zM571.412 685.482l-.959-.554v1.107l.959-.553zM64.91 197.583l-1.328-.763v1.538l1.329-.775zM73.823 180.583l-1.266.739 1.266.738v-1.477zM73.615 148.418l-.64.381.64.369v-.75zM92.695 148.799l-.775-.455v.898l.775-.443zM130.043 148.221l-.996.578.996.566v-1.144zM149.086 148.799l-.91-.529v1.058l.91-.529zM186.237 148.418l-.651.381.651.369v-.75zM205.207 148.799l-.627-.369v.726l.627-.357zM242.531 148.442l-.615.357.615.357v-.714zM261.5 148.799l-.615-.357v.714l.615-.357zM298.885 148.369l-.75.43.75.431v-.861zM317.989 148.799l-.885-.517v1.021l.885-.504zM355.289 148.184l-1.058.615 1.058.615v-1.23zM374.479 148.799l-1.156-.677v1.341l1.156-.664zM411.717 147.963l-1.427.836 1.427.824v-1.66zM431.177 148.799l-1.746-1.021v2.03l1.746-1.009zM468.378 147.348l-2.508 1.451 2.508 1.439v-2.89zM488.27 148.799l-2.926-1.698v3.395l2.926-1.697zM496.814 163.141l-3.332 1.919 3.332 1.919v-3.838zM517.406 197.583l-4.401-2.534v5.068l4.401-2.534zM525.495 210.99l-4.93 2.854 4.93 2.854v-5.708zM546.554 246.379l-5.888-3.408v6.803l5.888-3.395zM554.017 259.159l-6.012 3.481 6.012 3.469v-6.95zM575.236 295.163l-6.688-3.863v7.725l6.688-3.862zM582.624 307.155l-7.389 4.269 7.389 4.28v-8.549zM605.109 343.958l-9.269-5.363v10.714l9.269-5.351zM611.699 354.352l-10.155 5.868 10.155 5.855v-11.723zM635.917 392.742l-13.252-7.663v15.326l13.252-7.663zM641.449 400.356l-14.961 8.647 14.961 8.648v-17.295zM667.082 441.538l-17.765-10.271v20.53l17.765-10.259zM670.758 447.172L652.354 457.8l18.404 10.615v-21.243zM668.619 548.442l-11.999 6.937 11.999 6.925v-13.862zM662.189 571.641l-10.425-6.028v12.043l10.425-6.015zM638.979 599.796l-7.549 4.367 7.549 4.367v-8.734zM631.221 620.424l-6.208-3.579v7.171l6.208-3.592zM609.388 651.102l-3.221 1.845 3.221 1.869v-3.714zM600.278 669.22l-2.029-1.181v2.35l2.029-1.169zM64.591 165.06l-.86-.492v.984l.86-.492zM64.1 132.525l-.124-.061v.135l.123-.074zM101.718 132.243l-.492.282.492.296v-.578zM120.675 132.525l-.517-.282v.578l.517-.296zM157.986 132.316l-.369.209.369.222v-.431zM176.784 132.525l-.234-.123v.271l.234-.148zM214.206 132.464l-.111.061.111.074v-.135zM233.015 132.525l-.111-.061v.135l.111-.074zM270.573 132.378l-.283.147.283.16v-.307zM289.505 132.525l-.394-.221v.455l.394-.234zM327 132.144l-.664.381.664.394v-.775zM346.142 132.525l-.886-.504v1.021l.886-.517zM383.478 131.861l-1.156.665 1.156.676v-1.341zM402.754 132.525l-1.34-.762v1.537l1.34-.775zM440.029 131.443l-1.894 1.082 1.894 1.107v-2.189zM459.711 132.525l-2.324-1.34v2.693l2.324-1.353zM496.715 130.779l-3.024 1.746 3.024 1.759v-3.505zM516.914 165.06l-3.663-2.116v4.232l3.663-2.116zM525.225 178.948l-4.107 2.374 4.107 2.374v-4.748zM546.014 213.844l-5.09-2.94v5.88l5.09-2.94zM553.795 227.005l-5.372 3.113 5.372 3.099v-6.212zM574.301 262.64l-5.286-3.051v6.102l5.286-3.051zM581.96 275.789l-5.397 3.112 5.397 3.112v-6.224zM603.106 311.424l-6.258-3.617v7.233l6.258-3.616zM610.678 323.589l-7.093 4.096 7.093 4.096v-8.192zM633.09 360.22l-9.011-5.203v10.406l9.011-5.203zM639.937 370.454l-10.425 6.027 10.425 6.015v-12.042zM664.759 409.004l-14.286-8.254v16.519l14.286-8.265zM669.934 416.064l-15.945 9.201 15.945 9.213v-18.414zM667.106 583.597l-7.45 4.305 7.45 4.305v-8.61zM659.374 604.163l-6.209-3.58v7.159l6.209-3.579zM637.737 634.496l-3.799 2.19 3.799 2.201v-4.391zM628.75 652.947l-2.496-1.439v2.89l2.496-1.451zM608.527 685.1l-.639.382.639.369v-.751zM92.178 116.264h-.012v.012l.012-.012zM129.748 116.203l-.111.061.111.074v-.135zM298.713 116.117l-.259.147.259.16v-.307zM317.719 116.264l-.48-.27v.553l.48-.283zM355.227 115.76l-.885.504.885.517v-1.021zM374.417 116.264l-1.069-.603v1.218l1.069-.615zM411.729 115.428l-1.464.836 1.464.849v-1.685zM431.177 116.264l-1.746-1.008v2.029l1.746-1.021zM468.342 114.899l-2.374 1.365 2.374 1.378v-2.743zM488.085 116.264l-2.655-1.525v3.063l2.655-1.538zM516.717 132.525l-3.368-1.943v3.899l3.368-1.956zM525.077 146.683l-3.663 2.116 3.663 2.116v-4.232zM545.546 181.321l-4.389-2.533v5.067l4.389-2.534zM553.586 194.84l-4.745 2.743 4.745 2.743v-5.486zM573.981 230.118l-4.806-2.78v5.547l4.806-2.767zM581.702 243.697l-4.635 2.682 4.635 2.669v-5.351zM601.852 278.901l-4.377-2.534v5.056l4.377-2.522zM609.818 292.567l-4.5 2.596 4.5 2.595v-5.191zM630.988 327.685l-5.865-3.383v6.778l5.865-3.395zM638.757 339.985l-6.872 3.973 6.872 3.961v-7.934zM661.562 376.481l-9.491-5.486v10.96l9.491-5.474zM668.496 386.038l-11.618 6.704 11.618 6.704v-13.408zM665.938 618.149l-3.946 2.275 3.946 2.276v-4.551zM657.087 636.685l-2.778-1.599v3.211l2.778-1.612zM636.778 668.691l-.922.529.922.529v-1.058zM627.25 685.482l-.246-.148v.295l.246-.147zM289.308 100.003l-.098-.05v.111l.098-.061zM326.939 99.732l-.48.271.48.283v-.554zM345.994 100.003l-.664-.369v.75l.664-.381zM383.441 99.4l-1.058.603 1.058.615V99.4zM402.681 100.003l-1.23-.713v1.426l1.23-.713zM439.98 98.994l-1.759 1.009 1.759 1.021v-2.03zM459.552 100.003l-2.079-1.206v2.411l2.079-1.205zM496.568 98.502l-2.606 1.501 2.606 1.513v-3.014zM516.336 100.003l-2.803-1.611v3.222l2.803-1.611zM524.93 114.407l-3.221 1.857 3.221 1.87v-3.727zM545.263 148.799l-3.958-2.288v4.564l3.958-2.276zM553.427 162.6l-4.254 2.46 4.254 2.448V162.6zM573.748 197.583l-4.463-2.571v5.142l4.463-2.571zM581.604 211.347l-4.328 2.497 4.328 2.497v-4.994zM601.409 246.379l-3.713-2.153v4.293l3.713-2.14zM609.449 260.672l-3.393 1.968 3.393 1.956v-3.924zM629.377 295.162l-3.442-1.992v3.985l3.442-1.993zM637.774 309.173l-3.909 2.251 3.909 2.263v-4.514zM659.091 343.959l-5.778-3.346v6.679l5.778-3.333zM666.971 356.148l-7.044 4.072 7.044 4.059v-8.131zM664.943 652.406l-.959.541.959.553v-1.094zM655.489 669.22l-.381-.221v.43l.381-.209zM298.676 83.668l-.135.074.135.073v-.147zM317.571 83.742l-.258-.148v.295l.258-.147zM355.153 83.36l-.652.382.652.38v-.762zM374.319 83.742l-.922-.53v1.059l.922-.53zM411.692 82.967l-1.34.775 1.34.775v-1.55zM431.079 83.742l-1.598-.923v1.845l1.598-.922zM468.231 82.56l-2.041 1.182 2.041 1.18v-2.361zM487.852 83.742l-2.3-1.329v2.657l2.3-1.328zM524.77 82.167l-2.742 1.575 2.742 1.574v-3.149zM544.956 116.264l-3.504-2.017v4.047l3.504-2.03zM553.279 130.336l-3.811 2.189 3.811 2.202v-4.391zM573.514 165.06l-4.106-2.374v4.736l4.106-2.362zM581.505 179.009l-4.02 2.313 4.02 2.312v-4.625zM601.323 213.844l-3.59-2.067v4.146l3.59-2.079zM609.388 228.235l-3.234 1.882 3.234 1.858v-3.74zM628.701 262.64l-2.423-1.402v2.792l2.423-1.39zM637.233 277.573l-2.3 1.328 2.3 1.329v-2.657zM657.148 311.424l-2.864-1.649v3.309l2.864-1.66zM665.853 325.557l-3.689 2.128 3.689 2.14v-4.268zM289.259 67.48l-.013-.012v.012h.013zM326.915 67.26l-.394.22.394.222v-.443zM345.896 67.48l-.517-.307v.603l.517-.296zM383.392 66.94l-.922.54.922.53v-1.07zM402.656 67.48l-1.193-.688v1.377l1.193-.688zM439.931 66.546l-1.611.934 1.611.935v-1.87zM459.416 67.48l-1.881-1.094v2.177l1.881-1.082zM496.47 66.152l-2.3 1.328 2.3 1.329v-2.657zM516.115 67.48l-2.472-1.426v2.841l2.472-1.414zM544.538 83.742l-2.877-1.66v3.32l2.877-1.66zM553.082 98.146l-3.221 1.857 3.221 1.857v-3.714zM573.305 132.525l-3.786-2.189v4.379l3.786-2.19zM581.432 146.597l-3.811 2.202 3.811 2.202v-4.404zM601.311 181.321l-3.578-2.066v4.133l3.578-2.067zM609.412 195.676l-3.295 1.907 3.295 1.906v-3.813zM628.726 230.118l-2.472-1.44v2.854l2.472-1.414zM637.122 245.235l-1.98 1.144 1.98 1.144v-2.288zM656.128 278.901l-1.328-.762v1.525l1.328-.763zM665.127 294.277l-1.525.885 1.525.886v-1.771zM298.676 51.145l-.135.074.135.074v-.148zM317.571 51.22l-.258-.148v.295l.258-.148zM355.153 50.838l-.652.381.652.37v-.751zM374.233 51.22l-.787-.456v.91l.787-.455zM411.643 50.53l-1.205.69 1.205.688V50.53zM430.993 51.22l-1.476-.862v1.71l1.476-.849zM468.182 50.124l-1.894 1.095 1.894 1.095v-2.19zM487.68 51.22l-2.042-1.181V52.4l2.042-1.18zM524.647 49.854l-2.374 1.365 2.374 1.366v-2.731zM544.292 51.219l-2.509-1.451v2.89l2.509-1.439zM552.922 65.894l-2.754 1.586 2.754 1.587v-3.173zM572.924 100.003l-3.221-1.857v3.727l3.221-1.87zM581.333 114.235l-3.516 2.029 3.516 2.03v-4.059zM601.274 148.799l-3.516-2.029v4.059l3.516-2.03zM609.437 163.117l-3.369 1.943 3.369 1.944v-3.887zM628.873 197.583l-2.68-1.55v3.1l2.68-1.55zM637.221 212.54l-2.263 1.304 2.263 1.316v-2.62zM656.055 246.379l-1.23-.726v1.439l1.23-.713zM664.881 262.185l-.774.455.774.443v-.898zM270.486 34.946l-.025.012h.025v-.012zM289.333 34.958l-.136-.086v.16l.136-.074zM326.915 34.724l-.406.234.406.234v-.468zM345.994 34.958l-.664-.381v.75l.664-.369zM383.392 34.417l-.922.541.922.529v-1.07zM402.656 34.958l-1.193-.701v1.39l1.193-.689zM439.906 34.072l-1.525.886 1.525.873v-1.759zM459.33 34.958l-1.746-1.021v2.03l1.746-1.01zM496.396 33.752l-2.079 1.206 2.079 1.193v-2.399zM515.955 34.958l-2.226-1.291v2.57l2.226-1.279zM552.849 33.507l-2.509 1.451 2.509 1.44v-2.891zM572.641 67.48l-2.803-1.611v3.223l2.803-1.612zM581.173 81.995l-3.024 1.747 3.024 1.746v-3.493zM601.175 116.264l-3.368-1.943v3.899l3.368-1.956zM609.437 130.582l-3.369 1.943 3.369 1.956v-3.899zM629.058 165.06l-2.963-1.71v3.408l2.963-1.698zM637.356 179.772l-2.68 1.549 2.68 1.55v-3.099zM656.386 213.844l-1.721-.984v1.98l1.721-.996zM665.017 229.429l-1.181.689 1.181.676v-1.365zM261.106 18.697l-.012-.013v.013h.012zM298.713 18.537l-.259.16.259.148v-.308zM317.657 18.697l-.393-.234v.455l.393-.221zM355.153 18.315l-.652.382.652.369v-.75zM374.319 18.697l-.922-.541v1.07l.922-.53zM411.68 17.922l-1.316.775 1.316.762v-1.537zM430.993 18.697l-1.476-.861v1.71l1.476-.85zM468.133 17.676l-1.759 1.02 1.759 1.01v-2.03zM487.606 18.697l-1.931-1.132v2.239l1.931-1.107zM524.623 17.344l-2.313 1.353 2.313 1.34v-2.693zM544.268 18.697l-2.472-1.427v2.841l2.472-1.414zM572.519 34.958l-2.607-1.513v3.014l2.607-1.5zM581.075 49.633l-2.754 1.586 2.754 1.587v-3.173zM600.954 83.742l-3.037-1.76v3.519l3.037-1.76zM609.375 98.183l-3.172 1.82 3.172 1.833v-3.653zM629.229 132.525l-3.22-1.857v3.727l3.22-1.87zM637.454 147.089l-2.95 1.71 2.95 1.697v-3.407zM656.743 181.321l-2.263-1.303v2.607l2.263-1.304zM665.189 196.586l-1.722.997 1.722.996v-1.993zM270.486 2.411l-.024.012.024.025V2.41zM289.345 2.423l-.148-.086v.172l.148-.086zM326.964 2.128l-.529.295.529.308v-.603zM345.994 2.423l-.664-.381v.763l.664-.382zM383.441 1.808l-1.058.615 1.058.615v-1.23zM402.656 2.423l-1.193-.689v1.39l1.193-.7zM439.894 1.574l-1.488.85 1.488.86v-1.71zM459.33 2.423l-1.746-1.008v2.03l1.746-1.022zM496.384 1.255l-2.042 1.168 2.042 1.181v-2.35zM515.918 2.423l-2.176-1.255V3.69l2.176-1.267zM552.837.996l-2.472 1.427 2.472 1.427V.996zM572.519 2.423l-2.607-1.5v3.013l2.607-1.513zM581.075 17.098l-2.754 1.599 2.754 1.586v-3.186zM600.856 51.22l-2.889-1.674v3.346l2.889-1.673zM609.289 65.783l-2.938 1.697 2.938 1.698v-3.395zM629.131 100.003l-3.073-1.784v3.567l3.073-1.783zM637.528 114.444l-3.172 1.82 3.172 1.833v-3.653zM657.075 148.799l-2.754-1.599v3.186l2.754-1.587zM665.41 163.695l-2.361 1.365 2.361 1.353v-2.718zM600.856 18.697l-2.889-1.685v3.345l2.889-1.66zM609.277 33.285l-2.889 1.673 2.889 1.66v-3.333zM629.107 67.48l-3.037-1.759v3.518l3.037-1.759zM637.491 81.958l-3.073 1.784 3.073 1.783v-3.567zM657.296 116.264l-3.086-1.771v3.555l3.086-1.784zM665.582 130.865l-2.889 1.66 2.889 1.686v-3.346zM609.289.726l-2.938 1.697 2.938 1.698V.726zM629.107 34.958l-3.037-1.759v3.506l3.037-1.747zM637.479 49.46l-3.037 1.76 3.037 1.746V49.46zM657.345 83.742l-3.171-1.833v3.665l3.171-1.832zM665.644 98.22l-3.074 1.783 3.074 1.783v-3.567zM629.131 2.423L626.058.652v3.555l3.073-1.784zM637.528 16.864l-3.172 1.832 3.172 1.821v-3.653zM657.358 51.22l-3.184-1.846v3.678l3.184-1.833zM665.681 65.648l-3.184 1.833 3.184 1.832v-3.665zM657.456 18.697l-3.332-1.931v3.85l3.332-1.92zM665.729 33.027l-3.331 1.931 3.331 1.919v-3.85zM665.742.48l-3.369 1.943 3.369 1.956V.48z"
        fill="#302F2E"
      />
    </svg>
  );
}

const MemoFigure = React.memo(Figure);
export default MemoFigure;