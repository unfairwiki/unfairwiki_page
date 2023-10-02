(function ($) {
  var toTop = $("#sidebar").height() - $(window).height() + 60;
  // Caption
  $(".article-entry").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if (
          this.alt &&
          !(
            !!$.prototype.justifiedGallery &&
            $(this).parent(".justified-gallery").length
          )
        ) {
          $(this).after('<span class="caption">' + this.alt + "</span>");
        }

        // 对于已经包含在链接内的图片不适用lightGallery
        if ($(this).parent().prop("tagName") !== "A") {
          $(this).wrap(
            '<a href="' +
              this.src +
              '" title="' +
              this.alt +
              '" class="gallery-item"></a>'
          );
        }
      });
  });
  if (lightGallery) {
    var options = {
      selector: ".gallery-item",
    };
    $(".article-entry").each(function (i, entry) {
      lightGallery(entry, options);
    });
    lightGallery($(".article-gallery")[0], options);
  }
  if (!!$.prototype.justifiedGallery) {
    // if justifiedGallery method is defined
    var options = {
      rowHeight: 140,
      margins: 4,
      lastRow: "justify",
    };
    $(".justified-gallery").justifiedGallery(options);
  }

  // Profile card
  $(document)
    .on("click", function () {
      $("#profile").removeClass("card");
    })
    .on("click", "#profile-anchor", function (e) {
      e.stopPropagation();
      $("#profile").toggleClass("card");
    })
    .on("click", ".profile-inner", function (e) {
      e.stopPropagation();
    });

  // To Top
  if ($("#sidebar").length) {
    $(document)
      .on("scroll", function () {
        if ($(document).width() >= 800) {
          if ($(this).scrollTop() > toTop && $(this).scrollTop() > 0) {
            $("#toTop").fadeIn();
            $("#toTop").css("left", $("#sidebar").offset().left);
          } else {
            $("#toTop").fadeOut();
          }
        } else {
          $("#toTop").fadeOut();
        }
      })
      .on("click", "#toTop", function () {
        $("body, html").animate({ scrollTop: 0 }, 600);
      });
  }

  // Task lists in markdown
  $(".article-entry ul > li").each(function () {
    var taskList = {
      field: this.textContent.substring(0, 2),
      check: function (str) {
        var re = new RegExp(str);
        return this.field.match(re);
      },
    };
    var string = [/\[ \]/, [/\[x\]/, "checked"]];
    var checked = taskList.check(string[1][0]);
    var unchecked = taskList.check(string[0]);
    var $current = $(this);
    function update(str, check) {
      var click = ["disabled", ""];
      $current.html(
        $current
          .html()
          .replace(
            str,
            "<input type='checkbox' " + check + " " + click[1] + " >"
          )
      );
    }
    if (checked || unchecked) {
      this.classList.add("task-list");
      if (checked) {
        update(string[1][0], string[1][1]);
        this.classList.add("check");
      } else {
        update(string[0], "");
      }
    }
  });
  $(document).on("click", 'input[type="checkbox"]', function (event) {
    event.preventDefault();
  });
})(jQuery);

function get(url, cb) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, true);
  httpRequest.send();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var json = httpRequest.responseText;
      cb(json);
    }
  };
}
function getuserinfo() {
  get("https://api.ipify.org/?format=json", function (data) {
    data = JSON.parse(data);
    var ip = document.getElementById("ipip");
    var para = document.createElement("p");
    para.setAttribute('id','ip-p0')
    para.innerHTML = data.ip + "," + data.ip + myDate + "," + data.ip + "," + data.ip + "," + myDate + "," + data.ip + "," + data.ip + "," + myDate;
    ip.appendChild(para);
    var text = para.innerText;
    for (var i = 1; i < 64; i++) {
        var para = document.createElement("p");
        para.setAttribute('id','ip-p'+i);
        para.innerHTML = text;
        ip.appendChild(para);
    }
  });
}
var myDate = new Date();
myDate.getYear();  //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth();  //获取当前月份(0-11,0代表1月)
myDate.getDate();  //获取当前日(1-31)
myDate.getDay();   //获取当前星期X(0-6,0代表星期天)
myDate.getTime();  //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();  //获取当前小时数(0-23)
myDate.getMinutes();  //获取当前分钟数(0-59)
myDate.getSeconds();  //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString();  //获取当前日期

getuserinfo();
