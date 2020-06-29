//Kurs sınıfı
class Course{
    constructor(title,instructor,image){ //Kurs başlığı,eğitmen ve kurs resmi
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI sınıfı
class UI{

    //kursu listeye ekle
    addCourseToList(course){
        const list = document.getElementById('course-list');
        var html = `
        <tr>
            <td><img style="width:100px;" src="img/${course.image}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm d-flex justify-content-center delete">Sil</td>
        </tr>`; //template literal string oluşturarak yaptım
    
        list.innerHTML += html;
    }

    //inputlardaki kontrol değerlerini sil
    clearControls(){
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";
    }

    //kursu sil
    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    //bildirimleri göster
    showAlert(message,className){
        var alert = `
        <div class="alert bildirim alert-${className}">
            ${message}
        </div>
        `;
        const row = document.querySelector('.row');
        //parametreleri : beforeBegin,afterBegin,beforeEnd,afterEnd
        row.insertAdjacentHTML('beforeBegin',alert);
    
        setTimeout(()=>{
            document.querySelector('.bildirim').remove();
        },2000); //2 saniye sonra gelen alert sınıfına sahip olan elemanı siler
    }
}

//form üzerinde submit olayı gerçekleşir ise
document.getElementById('new-course').addEventListener('submit',
function(e){
    e.preventDefault();

    //form inputlarındaki değerleri alalım
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //Kurs objesini oluşturma
    const course = new Course(title,instructor,image);

    //UI objesini oluşturma
    const ui = new UI();
    
    //bildirim sisteminin hazırlanması
    if(title === '' || instructor === '' || image === ''){
        //eksik alan bildirimi
        ui.showAlert('Lütfen formu eksiksiz bir şekilde tamamlayınız','warning');
    }else{

        //kursu listeye ekle
        ui.addCourseToList(course);

        //kontrolleri sil
        ui.clearControls();

        //kurs eklendi bildirimi
        ui.showAlert('Kurs başarı ile eklendi','success');
    }

});

document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI(); //silme işlemimi ui nesnesi üzerinden yapacağım
    ui.deleteCourse(e.target);
    //kurs silindi bildirimi
    ui.showAlert('Kurs silindi','danger');
});
