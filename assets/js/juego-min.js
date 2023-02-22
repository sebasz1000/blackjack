const miModulo = (() => {
  "use strict";
  let e = [],
    t = document.querySelector("#take-card"),
    l = document.querySelector("#player-stop"),
    r = document.querySelector("#new-game"),
    a = document.querySelectorAll("small"),
    s = document.querySelectorAll(".card-deck"),
    d,
    i = (t = 2) => {
      console.clear(), (d = []);
      for (let l = 0; l < t; l++)
        d.push(0), $(l, void 0), (a[l].innerText = d[l]), (s[l].innerHTML = "");
      m(!1), (e = n()), console.log("*** New game initialized ****");
    },
    n = () => {
      e = [];
      for (let t = 2; t <= 10; t++) c(t, e);
      let l = ["A", "J", "K", "Q"];
      return l.forEach((t) => c(t, e)), _.shuffle(e);
    },
    c = (e, t) => {
      let l = ["C", "D", "H", "S"];
      l.forEach((l) => t.push(`${e + l}`));
    },
    o = () => {
      if (0 === e.length) throw Error("There are no more card on card deck");
      let t = Math.floor(Math.random() * (e.length - 1)),
        l = e[t];
      return e.splice(t, 1), l;
    },
    $ = (e, t) => (
      (d[e] = void 0 != t ? d[e] + g(t) : 0), (a[e].innerText = d[e]), d[e]
    ),
    u = (t) => {
      e = n();
      let l = "",
        r = 0,
        a = d.length - 1;
      do if (((l = o()), (r = $(a, l)), h(l, a), t > 21)) break;
      while (r <= t && r <= 21);
      b();
    },
    b = () => {
      let [e, t] = d;
      setTimeout(() => {
        e > 21
          ? window.alert("You lose")
          : t > 21
          ? window.alert("YOU WIN")
          : e === t
          ? window.alert("TIE!")
          : e < t && t <= 21
          ? window.alert("You lose")
          : e > t && e <= 21 && window.alert("YOU WIN");
      }, 100);
    },
    h = (e, t) => {
      let l = document.createElement("img");
      l.classList.add("carta"),
        (l.src = `assets/cartas/${e}.png`),
        s[t].append(l);
    },
    g = (e) => {
      let t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : parseInt(t);
    },
    m = (e = !0) => {
      (t.disabled = e),
        (l.disabled = e),
        e
          ? (t.classList.add("btn-disabled"), l.classList.add("btn-disabled"))
          : (t.classList.remove("btn-disabled"),
            l.classList.remove("btn-disabled"));
    };
  return (
    t.addEventListener("click", (e) => {
      let t = o(),
        l = $(0, t);
      h(t, 0),
        l > 21
          ? (m(!0), u(l))
          : 21 === l && (window.alert("21! YOU WIN"), m(!0), u(l));
    }),
    l.addEventListener("click", (e) => {
      m(!0), u(d[0]);
    }),
    r.addEventListener("click", (e) => i()),
    { initGame: i }
  );
})();
