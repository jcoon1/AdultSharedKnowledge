AppendageGen = ["koalas have fingerprints","ostriches have two toes"]
PouchGen = ["frogs have a vocal sac","monkeys have cheek pouches"]
MouthGen = ["lizards have peg-shaped teeth","giraffes have a purple tongue"]
WingGen = ["hawks have a bar on their wings","bats have elliptical wings"]

AppendageSome = ["some koalas have fingerprints","some ostriches have two toes"]
PouchSome = ["some frogs have a vocal sac","some monkeys have cheek pouches"]
MouthSome = ["some lizards have peg-shaped teeth","some giraffes have a purple tongue"]
WingSome = ["some hawks have a bar on their wings","some bats have elliptical wings"]

var ItemArray = [
{Animal: "a koala", TraitType: "Appendage", TraitVersion: 0, Format: "Generic", Fact: AppendageGen[0], Image: "../_shared/images/exemplars/Koala.jpg"},
{Animal: "an ostrich", TraitType: "Appendage", TraitVersion: 1, Format: "Generic", Fact: AppendageGen[1], Image: "../_shared/images/exemplars/Ostrich.jpg"},
{Animal: "a frog", TraitType: "Pouch", TraitVersion: 0, Format: "Generic", Fact: PouchGen[0], Image: "../_shared/images/exemplars/Frog.jpg"},
{Animal: "a monkey", TraitType: "Pouch", TraitVersion: 1, Format: "Generic", Fact: PouchGen[1], Image: "../_shared/images/exemplars/Monkey.jpg"},
{Animal: "a lizard", TraitType: "Mouth", TraitVersion: 0, Format: "Generic", Fact: MouthGen[0], Image: "../_shared/images/exemplars/Lizard.jpg"},
{Animal: "a giraffe", TraitType: "Mouth", TraitVersion: 1, Format: "Generic", Fact: MouthGen[1], Image: "../_shared/images/exemplars/Giraffe.jpg"},
{Animal: "a hawk", TraitType: "Wing", TraitVersion: 0, Format: "Generic", Fact: WingGen[0], Image: "../_shared/images/exemplars/Hawk.jpg"},
{Animal: "a bat", TraitType: "Wing", TraitVersion: 1, Format: "Generic", Fact: WingGen[1], Image: "../_shared/images/exemplars/Bat.jpg"},
{Animal: "a koala", TraitType: "Appendage", TraitVersion: 0, Format: "Some", Fact: AppendageSome[0], Image: "../_shared/images/exemplars/Koala.jpg"},
{Animal: "an ostrich", TraitType: "Appendage", TraitVersion: 1, Format: "Some", Fact: AppendageSome[1], Image: "../_shared/images/exemplars/Ostrich.jpg"},
{Animal: "a frog", TraitType: "Pouch", TraitVersion: 0, Format: "Some", Fact: PouchSome[0], Image: "../_shared/images/exemplars/Frog.jpg"},
{Animal: "a monkey", TraitType: "Pouch", TraitVersion: 1, Format: "Some", Fact: PouchSome[1], Image: "../_shared/images/exemplars/Monkey.jpg"},
{Animal: "a lizard", TraitType: "Mouth", TraitVersion: 0, Format: "Some", Fact: MouthSome[0], Image: "../_shared/images/exemplars/Lizard.jpg"},
{Animal: "a giraffe", TraitType: "Mouth", TraitVersion: 1, Format: "Some", Fact: MouthSome[1], Image: "../_shared/images/exemplars/Giraffe.jpg"},
{Animal: "a hawk", TraitType: "Wing", TraitVersion: 0, Format: "Some", Fact: WingSome[0], Image: "../_shared/images/exemplars/Hawk.jpg"},
{Animal: "a bat", TraitType: "Wing", TraitVersion: 1, Format: "Some", Fact: WingSome[1], Image: "../_shared/images/exemplars/Bat.jpg"}
]

function coinFlip() {
    return Math.floor(Math.random() * 2);
}

BlockOrderFlip = coinFlip()
AppendageFlip = coinFlip()
PouchFlip = coinFlip()
MouthFlip = coinFlip()
WingFlip = coinFlip()

exp.GenFilterList = []

exp.GenFilterList[0] = _.filter(ItemArray,function(item){return item["TraitType"] == "Appendage" && item["TraitVersion"] == AppendageFlip && item["Format"] == "Generic"})
exp.GenFilterList[1] = _.filter(ItemArray,function(item){return item["TraitType"] == "Mouth" && item["TraitVersion"] == MouthFlip && item["Format"] == "Generic"})
exp.GenFilterList[2] = _.filter(ItemArray,function(item){return item["TraitType"] == "Pouch" && item["TraitVersion"] == PouchFlip && item["Format"] == "Generic"})
exp.GenFilterList[3] = _.filter(ItemArray,function(item){return item["TraitType"] == "Wing" && item["TraitVersion"] == WingFlip && item["Format"] == "Generic"})

exp.SomeFilterList = []

exp.SomeFilterList[0] = _.filter(ItemArray,function(item){return item["TraitType"] == "Appendage" && item["TraitVersion"] != AppendageFlip && item["Format"] == "Some"})
exp.SomeFilterList[1] = _.filter(ItemArray,function(item){return item["TraitType"] == "Mouth" && item["TraitVersion"] != MouthFlip && item["Format"] == "Some"})
exp.SomeFilterList[2] = _.filter(ItemArray,function(item){return item["TraitType"] == "Pouch" && item["TraitVersion"] != PouchFlip && item["Format"] == "Some"})
exp.SomeFilterList[3] = _.filter(ItemArray,function(item){return item["TraitType"] == "Wing" && item["TraitVersion"] != WingFlip && item["Format"] == "Some"})

// var GenFilterList = ItemArray[0]
// var SomeFilterList = ItemArray[8]

// if (AppendageFlip == 1){
// GenFilterList[0] = ItemArray[1]
// SomeFilterList[0] = ItemArray[8]
// } else {GenFilterList[0] = ItemArray[0]
// SomeFilterList[0] = ItemArray[9]
// }

// if (PouchFlip == 1){
//   GenFilterList[1] = ItemArray[3]
//   SomeFilterList[1] = ItemArray[10]
// } else {GenFilterList[1] = ItemArray[2]
// SomeFilterList[1] = ItemArray[11]
// }

// if (MouthFlip == 1){
//   GenFilterList[2] = ItemArray[5]
//   SomeFilterList[2] = ItemArray[12]
// } else {GenFilterList[2] = ItemArray[4]
//   SomeFilterList[2] = ItemArray[13]
// }

// if (WingFlip == 1){
//   GenFilterList[3] = ItemArray[7]
//   SomeFilterList[3] = ItemArray[14]
// } else{GenFilterList[3] = ItemArray[6]
// SomeFilterList[4] = ItemArray[15]
// }


exp.ShuffledGenFilterList = _.shuffle(exp.GenFilterList);
exp.ShuffledSomeFilterList = _.shuffle(exp.SomeFilterList);

if(BlockOrderFlip == 0){
  exp.ItemSet = exp.ShuffledGenFilterList.concat(exp.ShuffledSomeFilterList)
 }else {exp.ItemSet = exp.ShuffledSomeFilterList.concat(exp.ShuffledGenFilterList)}

exp.PresentItems= []
for (i = 0;i < 8; i++){
  exp.PresentItems[i] = exp.ItemSet[i][0]
}

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.single_trial = slide({
    name: "single_trial",
    start: function() {
      $(".err").hide();
      $(".display_condition").html("You are in " + exp.condition + ".");
    },
    button : function() {
      response = $("#text_response").val();
      if (response.length == 0) {
        $(".err").show();
      } else {
        exp.data_trials.push({
          "trial_type" : "single_trial",
          "response" : response
        });
        exp.go(); //make sure this is at the *end*, after you log your data
      }
    },
  });

  slides.spread_slider = slide({
    name : "spread_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : exp.PresentItems,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.


      $(".CapFact").html(stim.Fact.charAt(0).toUpperCase() + stim.Fact.substring(1)+".");
      $(".QuestFact").html(stim.Fact + "?")
      $(".Animal").html(stim.Animal)
      "<img src=" + stim.Image + "alt=\"Animal\" id=\"AnimalPic\"></img>"
      $("#AnimalExemplar").html("<img src =\"" + stim.Image + "\" alt=\"Animal\" id=\"AnimalPic\"></img>")
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "spread_slider",
        "response" : exp.sliderPost,
        // "Animal" : stim.Animal,
        "Format" : this.stim.Format,
        "TraitType" : this.stim.TraitType,
        "Fact" : this.stim.Fact
      });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        // enjoyment : $("#enjoyment").val(),
        // asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val()
        // problems: $("#problems").val(),
        // fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "spread_slider", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
